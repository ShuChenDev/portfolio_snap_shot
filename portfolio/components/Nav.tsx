import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { NavContactMenu } from "@/components/NavContactMenu";
import { NavLink } from "@/components/NavLink";
import { navItems, siteConfig } from "@/lib/site";
import { content } from "@/lib/content";

export function Nav() {
  const contact = [
    { label: content.contact.phoneLabel, value: siteConfig.contact.phone },
    { label: content.contact.emailLabel, value: siteConfig.contact.email },
    { label: content.contact.studentEmailLabel, value: siteConfig.contact.studentEmail },
  ];

  return (
    <nav className="site-nav fixed inset-x-0 top-0 z-50 w-full overflow-visible border-b border-rule/50 bg-canvas/90 backdrop-blur-sm">
      <Container className="flex items-center justify-between overflow-visible py-5">
        <Link
          href="/"
          aria-label={content.nav.brandAria}
          className="text-sm font-semibold tracking-wide"
        >
          {content.site.name}
        </Link>
        <div className="site-nav-links hidden items-center gap-8 overflow-visible sm:flex">
          {navItems.map((item) => (
            <NavLink key={item.key} href={item.href} label={content.nav.items[item.key]} />
          ))}
          <NavContactMenu items={contact} label={content.nav.contact} />
        </div>
      </Container>
    </nav>
  );
}
