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
    
    setIsSubmitting(false);
    setUploadProgress("");
    
    if (result === null && !import.meta.env.VITE_SUPABASE_URL) {
      toast.error("Database connection missing. Setup requires `.env.local` configured.");
      return;
    }

    toast.success("Report submitted successfully. We'll review it shortly.");
    setUsername("");
    setPlatform("");
    setDescription("");
    setEmail("");
    setPhone("");
    setUploadedFiles([]);
    setActualFiles([]);
  };

  return (
    <section id="report-form" className="py-24 bg-background">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm mb-6">
              <Shield className="w-4 h-4" />
              <span>Secure & Confidential</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Report an Incident
            </h2>
            <p className="text-muted-foreground text-lg">
              Your report helps us protect the community. All submissions are handled with care.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-card rounded-2xl p-8 card-shadow border border-border"
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-foreground font-medium">
                  Offending Username / Profile URL *
                </Label>
                <Input id="username" placeholder="e.g., @username or profile link" required className="h-12" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="platform" className="text-foreground font-medium">Platform *</Label>
                <Input id="platform" placeholder="e.g., Instagram, Twitter, Facebook" required className="h-12" value={platform} onChange={(e) => setPlatform(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-foreground font-medium">Category *</Label>
                <select 
                  id="category" 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-12 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
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
                <Label htmlFor="description" className="text-foreground font-medium">Description of Incident *</Label>
                <Textarea id="description" placeholder="Describe what happened, when it occurred, and any relevant details..." required className="min-h-[150px] resize-none" value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label className="text-foreground font-medium">Upload Evidence (Screenshots, etc.)</Label>
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-accent/50 transition-colors cursor-pointer">
                  <input type="file" id="file-upload" className="hidden" multiple accept="image/*,.pdf" onChange={handleFileUpload} />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-foreground font-medium">Click to upload or drag and drop</p>
                    <p className="text-sm text-muted-foreground mt-1">PNG, JPG, PDF up to 10MB</p>
                  </label>
                </div>
                {uploadedFiles.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {uploadedFiles.map((file, i) => (
                      <span key={i} className="px-3 py-1 bg-secondary rounded-full text-sm text-secondary-foreground">{file}</span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                <div className="flex items-center gap-3">
                  {isAnonymous ? <EyeOff className="w-5 h-5 text-accent" /> : <Eye className="w-5 h-5 text-muted-foreground" />}
                  <div>
                    <p className="text-foreground font-medium">Report Anonymously</p>
                    <p className="text-sm text-muted-foreground">Your identity won't be shared</p>
                  </div>
                </div>
                <Checkbox checked={isAnonymous} onCheckedChange={(checked) => setIsAnonymous(checked as boolean)} />
              </div>

              {!isAnonymous && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground font-medium">Email Address</Label>
                    <Input id="email" type="email" placeholder="your@email.com" className="h-12" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-foreground font-medium">Phone Number (Optional)</Label>
                    <Input id="phone" type="tel" placeholder="+91 98765 43210" className="h-12" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                </motion.div>
              )}

              <Button type="submit" disabled={isSubmitting} size="lg" className="w-full accent-gradient text-accent-foreground h-14 text-lg font-semibold">
                <Send className="mr-2 w-5 h-5" />
                {isSubmitting ? uploadProgress || "Submitting..." : "Submit Report"}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
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
