"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import api from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import type { KYC } from "@/types"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ShieldCheck,
  ShieldAlert,
  Clock,
  CheckCircle,
  XCircle,
  Upload,
  FileText,
  Camera,
  Loader2,
  AlertCircle,
} from "lucide-react"

// ─── File Upload Field ────────────────────────────────────────────────────────

interface FileUploadFieldProps {
  label: string
  accept: string
  hint: string
  icon: React.ReactNode
  uploading: boolean
  uploadedUrl: string
  onFile: (file: File) => void
}

function FileUploadField({ label, accept, hint, icon, uploading, uploadedUrl, onFile }: FileUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) onFile(file)
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        className={`
          relative flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 text-center cursor-pointer transition-colors
          ${uploadedUrl
            ? "border-green-500/50 bg-green-500/5"
            : "border-muted-foreground/30 hover:border-primary/50 hover:bg-muted/40"
          }
          ${uploading ? "pointer-events-none opacity-70" : ""}
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={handleChange}
          disabled={uploading}
        />

        {uploading ? (
          <>
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Uploading…</p>
          </>
        ) : uploadedUrl ? (
          <>
            <CheckCircle className="h-8 w-8 text-green-500" />
            <p className="text-sm font-medium text-green-600 dark:text-green-400">Uploaded successfully</p>
            <p className="text-xs text-muted-foreground">Click to replace</p>
          </>
        ) : (
          <>
            <div className="text-muted-foreground">{icon}</div>
            <p className="text-sm font-medium">Click to upload</p>
            <p className="text-xs text-muted-foreground">{hint}</p>
          </>
        )}
      </div>
    </div>
  )
}

// ─── Status Banner ────────────────────────────────────────────────────────────

function KycStatusBanner({ kyc }: { kyc: KYC }) {
  if (kyc.status === "approved") {
    return (
      <Card className="border-green-500/50 bg-green-500/5">
        <CardContent className="pt-6 pb-6 flex items-start gap-4">
          <ShieldCheck className="h-8 w-8 text-green-500 shrink-0" />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <p className="font-semibold text-green-700 dark:text-green-400">Identity Verified</p>
              <Badge className="bg-green-500/20 text-green-700 border-green-500/30 text-xs">Approved</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Your KYC verification has been approved. You are now fully verified and can create listings.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (kyc.status === "pending") {
    return (
      <Card className="border-amber-500/50 bg-amber-500/5">
        <CardContent className="pt-6 pb-6 flex items-start gap-4">
          <Clock className="h-8 w-8 text-amber-500 shrink-0" />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <p className="font-semibold text-amber-700 dark:text-amber-400">Under Review</p>
              <Badge className="bg-amber-500/20 text-amber-700 border-amber-500/30 text-xs">Pending</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Your KYC submission is being reviewed by our team. This usually takes 1–2 business days.
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <span>ID Type: <strong className="text-foreground capitalize">{kyc.id_type ?? "—"}</strong></span>
              <span>Submitted: <strong className="text-foreground">{new Date(kyc.created_at).toLocaleDateString()}</strong></span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return null
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function KYCSubmissionPage() {
  const { toast } = useToast()

  // Existing KYC
  const [existingKyc, setExistingKyc]       = useState<KYC | null>(null)
  const [fetchingStatus, setFetchingStatus] = useState(true)

  // Form fields
  const [idType, setIdType]     = useState("")
  const [idNumber, setIdNumber] = useState("")

  // Uploaded file URLs
  const [idDocumentUrl, setIdDocumentUrl] = useState("")
  const [facePhotoUrl, setFacePhotoUrl]   = useState("")

  // Per-file upload loading
  const [idDocUploading, setIdDocUploading]       = useState(false)
  const [facePhotoUploading, setFacePhotoUploading] = useState(false)

  // Form submission
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted]   = useState(false)
  const [error, setError]           = useState<string | null>(null)

  // ── Fetch existing KYC status on mount ──
  useEffect(() => {
    api.get<KYC>("/kyc/my-kyc")
      .then((res) => setExistingKyc(res.data))
      .catch(() => setExistingKyc(null))
      .finally(() => setFetchingStatus(false))
  }, [])

  // ── Upload a file to Cloudinary via /upload ──
  const uploadFile = async (
    file: File,
    setUrl: (url: string) => void,
    setUploading: (v: boolean) => void,
  ) => {
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await api.post<{ url: string }>("/upload?folder=kyc-documents", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      setUrl(res.data.url)
      toast({ title: "File uploaded" })
    } catch (err: any) {
      toast({
        title: "Upload failed",
        description: err?.message || "Please try again.",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  // ── Submit KYC form ──
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!idDocumentUrl) {
      setError("Please upload your ID document before submitting.")
      return
    }
    if (!facePhotoUrl) {
      setError("Please upload your face photo before submitting.")
      return
    }

    setSubmitting(true)
    try {
      await api.post("/kyc", {
        id_type: idType,
        id_number: idNumber,
        id_document_url: idDocumentUrl,
        face_photo_url: facePhotoUrl,
      })
      setSubmitted(true)
      toast({
        title: "KYC submitted successfully",
        description: "Our team will review your documents within 1–2 business days.",
      })
    } catch (err: any) {
      const msg = err?.response?.data?.message
      setError(Array.isArray(msg) ? msg.join(", ") : msg || "Submission failed. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  // ── Loading ──
  if (fetchingStatus) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // ── Success (just submitted) ──
  if (submitted) {
    return (
      <div className="p-4 md:p-8 max-w-lg mx-auto">
        <Card className="border-green-500/50 bg-green-500/5">
          <CardContent className="pt-8 pb-8 flex flex-col items-center text-center gap-4">
            <CheckCircle className="h-14 w-14 text-green-500" />
            <div>
              <h2 className="text-xl font-bold text-green-700 dark:text-green-400">Submission Received</h2>
              <p className="text-sm text-muted-foreground mt-2 max-w-sm">
                Your KYC documents have been submitted. Our team will review them and respond within 1–2 business days.
              </p>
            </div>
            <Badge className="bg-amber-500/20 text-amber-700 border-amber-500/30">Pending Review</Badge>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">KYC Verification</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Submit your identity documents to get verified and start listing on the marketplace.
        </p>
      </div>

      {/* Status banner (approved or pending) */}
      {existingKyc && existingKyc.status !== "rejected" && (
        <KycStatusBanner kyc={existingKyc} />
      )}

      {/* Rejection notice + allow resubmission */}
      {existingKyc?.status === "rejected" && (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Your previous submission was rejected.</strong>
            {existingKyc.admin_comment && (
              <span className="block mt-1 text-sm">Reason: {existingKyc.admin_comment}</span>
            )}
            <span className="block mt-1 text-sm">Please correct the issue and resubmit below.</span>
          </AlertDescription>
        </Alert>
      )}

      {/* Form — shown when no KYC or rejected */}
      {(!existingKyc || existingKyc.status === "rejected") && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Identity Verification
            </CardTitle>
            <CardDescription>
              All documents are stored securely. We do not share your data with third parties.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive" className="py-3">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* ID Type */}
              <div className="space-y-2">
                <Label htmlFor="idType">ID Type <span className="text-destructive">*</span></Label>
                <Select value={idType} onValueChange={setIdType} required>
                  <SelectTrigger id="idType">
                    <SelectValue placeholder="Select your ID type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NIN">National Identification Number (NIN)</SelectItem>
                    <SelectItem value="passport">International Passport</SelectItem>
                    <SelectItem value="voter_card">Voter's Card</SelectItem>
                    <SelectItem value="drivers_license">Driver's License</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* ID Number */}
              <div className="space-y-2">
                <Label htmlFor="idNumber">ID Number <span className="text-destructive">*</span></Label>
                <Input
                  id="idNumber"
                  type="text"
                  placeholder="Enter your ID number"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  required
                />
              </div>

              {/* ID Document Upload */}
              <FileUploadField
                label={`ID Document * (image or PDF)`}
                accept="image/jpeg,image/png,image/webp,application/pdf"
                hint="JPEG, PNG, WEBP or PDF · max 50 MB"
                icon={<FileText className="h-8 w-8" />}
                uploading={idDocUploading}
                uploadedUrl={idDocumentUrl}
                onFile={(file) => uploadFile(file, setIdDocumentUrl, setIdDocUploading)}
              />

              {/* Face Photo Upload */}
              <FileUploadField
                label="Face Photo * (selfie or portrait)"
                accept="image/jpeg,image/png,image/webp"
                hint="JPEG, PNG or WEBP only · max 50 MB"
                icon={<Camera className="h-8 w-8" />}
                uploading={facePhotoUploading}
                uploadedUrl={facePhotoUrl}
                onFile={(file) => uploadFile(file, setFacePhotoUrl, setFacePhotoUploading)}
              />

              <p className="text-xs text-muted-foreground flex items-start gap-1.5">
                <ShieldAlert className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                Make sure your documents are clear, unobstructed, and not expired. Blurry or cropped images will be rejected.
              </p>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={
                  submitting ||
                  idDocUploading ||
                  facePhotoUploading ||
                  !idType ||
                  !idNumber.trim() ||
                  !idDocumentUrl ||
                  !facePhotoUrl
                }
              >
                {submitting
                  ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Submitting…</>
                  : <><Upload className="h-4 w-4 mr-2" />Submit KYC Documents</>
                }
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
