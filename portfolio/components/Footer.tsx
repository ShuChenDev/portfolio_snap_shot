import { FooterGitHubNote } from "@/components/FooterGitHubNote";
import { Container } from "@/components/ui/Container";
import { content } from "@/lib/content";

export function Footer() {
  const { footer } = content;
  return (
    <footer className="bg-ink text-canvas">
      <Container className="py-8">
        <div className="flex items-center justify-between text-xs">
          <span>{footer.copyright}</span>
          <ul className="flex gap-4">
            {footer.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target={"download" in link && link.download ? undefined : "_blank"}
                  rel={"download" in link && link.download ? undefined : "noopener noreferrer"}
                  download={"download" in link && link.download ? "" : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <FooterGitHubNote note={footer.githubNote} />
      </Container>
    </footer>
  );
}
