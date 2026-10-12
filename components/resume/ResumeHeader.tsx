import { Download, Globe, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import type { Resume } from "@/lib/types";
import { PrintButton } from "@/components/resume/PrintButton";

type Props = {
  basics: Resume["basics"];
  meta: Resume["meta"];
  siteUrl: string;
};

function ProfileIcon({ network }: { network: string }) {
  const cls = "h-4 w-4 shrink-0";
  if (/linkedin/i.test(network)) return <Linkedin aria-hidden className={cls} />;
  return <Globe aria-hidden className={cls} />;
}

export function ResumeHeader({ basics, meta, siteUrl }: Props) {
  const showPhone = meta.privacy.showPhone && basics.phone;
  const telHref = basics.phone ? `tel:${basics.phone.replace(/[^\d+]/g, "")}` : "";

  return (
    <header className="grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
      <div className="min-w-0">
        <p className="text-xs font-semibold tracking-widest text-ink-500 uppercase">Resume</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink-950 sm:text-4xl">{basics.name}</h1>
        <p className="mt-2 text-base text-ink-700">{basics.headline}</p>

        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-600" aria-label="Contact details">
          <li className="inline-flex items-center gap-1.5">
            <MapPin aria-hidden className="h-4 w-4 shrink-0" />
            {basics.location.label}
          </li>
          <li>
            <a href={`mailto:${basics.email}`} className="inline-flex items-center gap-1.5 hover:text-ink-900">
              <Mail aria-hidden className="h-4 w-4 shrink-0" />
              {basics.email}
            </a>
          </li>
          {showPhone ? (
            <li>
              <a href={telHref} className="inline-flex items-center gap-1.5 hover:text-ink-900">
                <Phone aria-hidden className="h-4 w-4 shrink-0" />
                {basics.phone}
              </a>
            </li>
          ) : null}
          {basics.profiles.map((p) => (
            <li key={p.url}>
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-ink-900"
              >
                <ProfileIcon network={p.network} />
                <span>
                  <span className="sr-only">{p.network}: </span>
                  {p.username ?? p.url}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-2 hidden text-xs text-ink-500 print:block">
          Latest version: {siteUrl.replace(/^https?:\/\//, "")}/resume · Updated {meta.version}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 print:hidden">
        <a
          href={meta.pdf}
          download={meta.pdfFilename}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-ink-800"
        >
          <Download aria-hidden className="h-4 w-4" />
          Download CV (PDF)
        </a>
        <PrintButton />
      </div>
    </header>
  );
}
