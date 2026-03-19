import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Send, Shield, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { addReport } from "@/lib/reportStore";
import { supabase } from "@/lib/supabase";

const ReportForm = () => {
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [username, setUsername] = useState("");
  const [platform, setPlatform] = useState("");
  const [category, setCategory] = useState("Scam / Fraud");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [actualFiles, setActualFiles] = useState<File[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      setActualFiles(prev => [...prev, ...newFiles]);
      setUploadedFiles(prev => [...prev, ...newFiles.map(f => f.name)]);
      toast.success(`${files.length} file(s) selected`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setUploadProgress("Uploading evidence...");

    // Upload files to Supabase Storage first
    const evidenceUrls: string[] = [];
    if (actualFiles.length > 0 && import.meta.env.VITE_SUPABASE_URL) {
      for (const file of actualFiles) {
        // Create a unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        const filePath = `reports/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('evidence')
          .upload(filePath, file);

        if (uploadError) {
          console.error("Upload error:", uploadError);
          toast.error(`Failed to upload ${file.name}`);
        } else {
          // Get public URL
          const { data: publicUrlData } = supabase.storage
            .from('evidence')
            .getPublicUrl(filePath);
          
          if (publicUrlData) {
            evidenceUrls.push(publicUrlData.publicUrl);
          }
        }
      }
    }

    setUploadProgress("Submitting report...");
    
    try {
      const result = await addReport({
        username: username.startsWith("@") ? username : `@${username}`,
        platform,
        category,
        description,
        isAnonymous,
        email: isAnonymous ? undefined : email,
        phone: isAnonymous ? undefined : phone,
        evidence_urls: evidenceUrls,
      });
      
      if (result) {
        toast.success("Report submitted successfully. We'll review it shortly.");
        setUsername("");
        setPlatform("");
        setCategory("Scam / Fraud");
        setDescription("");
        setEmail("");
        setPhone("");
        setUploadedFiles([]);
        setActualFiles([]);
        setIsSubmitted(true);
      } else if (!import.meta.env.VITE_SUPABASE_URL) {
        toast.error("Database connection missing. Setup requires `.env.local` configured.");
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error(`Failed to submit report: ${error.message || "Unknown error"}`);
    } finally {
      setIsSubmitting(false);
      setUploadProgress("");
    }
  };

  if (isSubmitted) {
    return (
      <section id="report-form" className="py-24 bg-background">
        <div className="container">
          <div className="max-w-xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card rounded-2xl p-12 text-center card-shadow border border-border"
            >
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                <Shield className="w-10 h-10" />
              </div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                Thank You for Reporting
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Your report has been successfully submitted and is now under review by our safety team. Together, we can make the community safer.
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-secondary/50 rounded-xl text-left border border-border">
                  <p className="text-sm font-medium text-foreground mb-1">What Happens Next?</p>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                      <span>Our team will verify the details of your report.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                      <span>Verified malicious accounts will be added to the Awareness Feed.</span>
                    </li>
                  </ul>
                </div>
                <Button 
                  onClick={() => setIsSubmitted(false)} 
                  variant="outline" 
                  className="w-full h-12"
                >
                  Submit Another Report
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="report-form" className="py-24 bg-white border-b-4 border-foreground">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-6 py-2 border-2 border-foreground bg-primary text-white font-bold uppercase text-sm mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Shield className="w-4 h-4" />
              <span>SECURE & CONFIDENTIAL</span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl font-black text-foreground mb-4 uppercase tracking-tighter">
              REPORT AN INCIDENT
            </h2>
            <p className="text-foreground font-bold text-lg max-w-2xl mx-auto uppercase tracking-tight">
              Your report helps us protect the community. All submissions are handled with care.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="brutalist-card p-10 bg-white"
          >
            <div className="space-y-8">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-foreground font-black uppercase tracking-tight">
                  Offending Username / Profile URL *
                </Label>
                <Input id="username" placeholder="E.G., @USERNAME OR PROFILE LINK" required className="brutalist-input h-14 uppercase" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="platform" className="text-foreground font-black uppercase tracking-tight">Platform *</Label>
                <Input id="platform" placeholder="E.G., INSTAGRAM, TWITTER, FACEBOOK" required className="brutalist-input h-14 uppercase" value={platform} onChange={(e) => setPlatform(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-foreground font-black uppercase tracking-tight">Category *</Label>
                <select 
                  id="category" 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-14 px-4 brutalist-input bg-background font-bold uppercase"
                >
                  <option value="Scam / Fraud">Scam / Fraud</option>
                  <option value="Harassment">Harassment</option>
                  <option value="Phishing">Phishing</option>
                  <option value="Impersonation">Impersonation</option>
                  <option value="Spam">Spam</option>
                  <option value="Cyberbullying">Cyberbullying</option>
                  <option value="Financial Fraud">Financial Fraud</option>
                  <option value="Romance Scam">Romance Scam</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-foreground font-black uppercase tracking-tight">Description of Incident *</Label>
                <Textarea id="description" placeholder="DESCRIBE WHAT HAPPENED, WHEN IT OCCURRED, AND ANY RELEVANT DETAILS..." required className="min-h-[150px] resize-none brutalist-input uppercase text-sm font-bold" value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label className="text-foreground font-black uppercase tracking-tight">Upload Evidence (Screenshots, etc.)</Label>
                <div className="border-4 border-dashed border-foreground bg-[#f9f9f9] p-10 text-center cursor-pointer transition-all hover:bg-secondary/20">
                  <input type="file" id="file-upload" className="hidden" multiple accept="image/*,.pdf" onChange={handleFileUpload} />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-foreground mx-auto mb-4" />
                    <p className="text-foreground font-black uppercase tracking-tight">Click to upload or drag and drop</p>
                    <p className="text-xs font-bold text-foreground/60 mt-1 uppercase">PNG, JPG, PDF UP TO 10MB</p>
                  </label>
                </div>
                {uploadedFiles.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {uploadedFiles.map((file, i) => (
                      <span key={i} className="px-4 py-2 border-2 border-foreground bg-secondary font-black text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">{file}</span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between p-6 bg-secondary border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border-2 border-foreground bg-white flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    {isAnonymous ? <EyeOff className="w-6 h-6 text-foreground" /> : <Eye className="w-6 h-6 text-foreground" />}
                  </div>
                  <div>
                    <p className="text-foreground font-black uppercase tracking-tight">Report Anonymously</p>
                    <p className="text-xs font-bold text-foreground/60 uppercase">Your identity won't be shared</p>
                  </div>
                </div>
                <Checkbox 
                  checked={isAnonymous} 
                  onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
                  className="w-8 h-8 border-2 border-foreground data-[state=checked]:bg-foreground data-[state=checked]:text-white"
                />
              </div>

              {!isAnonymous && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="space-y-6 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground font-black uppercase tracking-tight">Email Address</Label>
                    <Input id="email" type="email" placeholder="YOUR@EMAIL.COM" className="brutalist-input h-14 uppercase" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-foreground font-black uppercase tracking-tight">Phone Number (Optional)</Label>
                    <Input id="phone" type="tel" placeholder="+91 98765 43210" className="brutalist-input h-14 uppercase" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                </motion.div>
              )}

              <Button type="submit" disabled={isSubmitting} size="lg" className="w-full brutalist-button safety-orange h-16 text-xl">
                <Send className="mr-3 w-6 h-6" />
                {isSubmitting ? (uploadProgress || "SUBMITTING...").toUpperCase() : "SUBMIT REPORT"}
              </Button>

              <p className="text-[10px] font-bold text-foreground/40 text-center uppercase tracking-widest">
                By submitting, you agree to our terms of use. False reports may face legal action.
              </p>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ReportForm;
