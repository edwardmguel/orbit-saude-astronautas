import { useEffect, useRef, useState } from "react";
import { Camera, ImageUp, RefreshCw, Check, VideoOff, X } from "lucide-react";
import { Modal } from "./ui";

const ACCEPT = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 10 * 1024 * 1024;

/** Center-crops to a square and downsizes for lightweight persistent storage. */
function toSquareDataUrl(source: CanvasImageSource, w: number, h: number, mirror = false, size = 480): string {
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d")!;
  const s = Math.min(w, h);
  if (mirror) {
    ctx.translate(size, 0);
    ctx.scale(-1, 1);
  }
  ctx.drawImage(source, (w - s) / 2, (h - s) / 2, s, s, 0, 0, size, size);
  return c.toDataURL("image/jpeg", 0.86);
}

export function readImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!ACCEPT.includes(file.type)) return reject(new Error("Unsupported format. Use JPG, JPEG, PNG or WEBP."));
    if (file.size > MAX_BYTES) return reject(new Error("File too large (max. 10 MB)."));
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      try {
        resolve(toSquareDataUrl(img, img.naturalWidth, img.naturalHeight));
      } catch (e) {
        reject(e as Error);
      } finally {
        URL.revokeObjectURL(url);
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read the selected image."));
    };
    img.src = url;
  });
}

interface Props {
  value?: string;
  onChange: (dataUrl: string) => void;
  invalid?: boolean;
}

/** Photo area: choose between camera (getUserMedia) and file upload. */
export function PhotoField({ value, onChange, invalid }: Props) {
  const [menu, setMenu] = useState(false);
  const [camera, setCamera] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const camSupported = typeof navigator !== "undefined" && !!navigator.mediaDevices?.getUserMedia;

  const pickFile = () => {
    setMenu(false);
    fileRef.current?.click();
  };

  const onFile = async (f?: File) => {
    if (!f) return;
    setError(null);
    try {
      onChange(await readImageFile(f));
    } catch (e) {
      setError((e as Error).message);
    }
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <button
          type="button"
          onClick={() => setMenu((m) => !m)}
          aria-invalid={invalid}
          aria-label={value ? "Replace photo" : "Add photo"}
          className={`group relative flex h-36 w-36 items-center justify-center overflow-hidden rounded-[18px] border bg-navy/70 transition sm:h-40 sm:w-40 ${
            invalid ? "border-st-critical/70" : "border-line-strong hover:border-cyan/60"
          } shadow-[0_0_40px_-18px_#21c5ef]`}
        >
          {value ? (
            <>
              <img src={value} alt="Astronaut photo" className="h-full w-full object-cover" />
              <span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1.5 bg-navy/80 py-1.5 text-[11px] font-medium text-ink opacity-0 transition group-hover:opacity-100">
                <RefreshCw size={12} /> Replace
              </span>
            </>
          ) : (
            <span className="flex flex-col items-center gap-2 text-mist transition group-hover:text-cyan">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-cyan/30 bg-cyan/5">
                <Camera size={22} />
              </span>
              <span className="text-xs font-medium">Add image</span>
            </span>
          )}
          <span className="pointer-events-none absolute inset-2 rounded-[13px] border border-dashed border-cyan/15" />
        </button>

        {menu && (
          <>
            <div className="fixed inset-0 z-20" onClick={() => setMenu(false)} />
            <div className="glass sheet-up absolute left-1/2 top-full z-30 mt-2 w-60 -translate-x-1/2 !bg-[#0d2135] p-1.5">
              <button
                type="button"
                onClick={() => {
                  setMenu(false);
                  setError(null);
                  setCamera(true);
                }}
                disabled={!camSupported}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-ink transition hover:bg-cyan/10 disabled:opacity-40"
              >
                <Camera size={17} className="text-cyan" />
                <span>
                  Take photo
                  <span className="block text-[11px] text-mist">{camSupported ? "Use the computer camera" : "Camera unavailable"}</span>
                </span>
              </button>
              <button type="button" onClick={pickFile} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-ink transition hover:bg-cyan/10">
                <ImageUp size={17} className="text-cyan" />
                <span>
                  Upload photo
                  <span className="block text-[11px] text-mist">JPG, JPEG, PNG or WEBP</span>
                </span>
              </button>
            </div>
          </>
        )}
      </div>
      <input ref={fileRef} type="file" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} data-testid="photo-input" />
      {error && <p className="max-w-60 text-center text-xs text-st-critical">{error}</p>}
      <CameraModal
        open={camera}
        onClose={() => setCamera(false)}
        onConfirm={(d) => {
          onChange(d);
          setCamera(false);
        }}
        onFallback={() => {
          setCamera(false);
          fileRef.current?.click();
        }}
      />
    </div>
  );
}

function CameraModal({ open, onClose, onConfirm, onFallback }: { open: boolean; onClose: () => void; onConfirm: (d: string) => void; onFallback: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [shot, setShot] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const stop = () => {
    token.current++;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  };

  const token = useRef(0);
  const start = async () => {
    const my = ++token.current;
    setErr(null);
    setLoading(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: "user" }, audio: false });
      if (my !== token.current) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => undefined);
      }
    } catch (e) {
      const name = (e as DOMException).name;
      setErr(
        name === "NotAllowedError"
          ? "Camera access permission was denied. You can upload a photo from your computer."
          : name === "NotFoundError"
            ? "No camera was found on this device."
            : "Could not start the camera.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      setShot(null);
      start();
    } else stop();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!shot && open && streamRef.current && videoRef.current && !videoRef.current.srcObject) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play().catch(() => undefined);
    }
  }, [shot, open]);

  const capture = () => {
    const v = videoRef.current;
    if (!v || !v.videoWidth) return;
    setShot(toSquareDataUrl(v, v.videoWidth, v.videoHeight, true));
  };

  return (
    <Modal open={open} onClose={onClose} title="TAKE PHOTO">
      <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-2xl border border-line-strong bg-black">
        {shot ? (
          <img src={shot} alt="Capture preview" className="h-full w-full object-cover" />
        ) : (
          <video ref={videoRef} playsInline muted className="h-full w-full -scale-x-100 object-cover" />
        )}
        {!shot && !err && (
          <div className="pointer-events-none absolute inset-6 rounded-[40%] border border-dashed border-cyan/40" aria-hidden />
        )}
        {loading && <div className="absolute inset-0 flex items-center justify-center text-sm text-mist">Requesting camera access…</div>}
        {err && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
            <VideoOff className="text-mist" />
            <p className="text-sm text-mist">{err}</p>
            <button type="button" className="btn-ghost" onClick={onFallback}>
              <ImageUp size={15} /> Upload photo
            </button>
          </div>
        )}
        {!shot && !err && <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/50 px-2 py-1 text-[10px] font-semibold tracking-widest text-st-critical"><span className="h-1.5 w-1.5 rounded-full bg-st-critical soft-blink" />LIVE</span>}
      </div>
      <div className="mt-5 flex flex-wrap justify-center gap-3">
        {!shot ? (
          <>
            <button type="button" className="btn-ghost" onClick={onClose}>
              <X size={15} /> Cancel
            </button>
            <button type="button" className="btn-primary" onClick={capture} disabled={!!err || loading}>
              <Camera size={16} /> Capture
            </button>
          </>
        ) : (
          <>
            <button type="button" className="btn-ghost" onClick={() => setShot(null)}>
              <RefreshCw size={15} /> Retake
            </button>
            <button type="button" className="btn-primary" onClick={() => shot && onConfirm(shot)}>
              <Check size={16} /> Confirm
            </button>
          </>
        )}
      </div>
    </Modal>
  );
}
