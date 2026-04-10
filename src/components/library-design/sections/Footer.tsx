import { cn } from "@/lib/utils";
import { FloatingCard } from "@/components/library-design/ui/FloatingCard";

interface FooterSection {
  title: string;
  links: Array<{ label: string; href?: string }>;
}

interface FooterColumn {
  title: string;
  links?: Array<{ label: string; href?: string }>;
  sections?: FooterSection[];
}

interface FooterProps {
  columns: FooterColumn[];
  copyright?: string;
  className?: string;
}

function AirSaasLogo() {
  return (
    <svg width="109" height="33" viewBox="0 0 109 33" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M15.1789 0L29.514 31.178L14.7327 26.4814L19.0973 23.7644L22.2979 24.7833L15.1789 9.30585L8.89395 22.9687L16.8762 18.0683L18.5153 21.6296L0 32.9829L15.1789 0Z" fill="var(--color-primary)"/>
      <path d="M32.6192 6.03893C33.8994 6.05834 34.9178 7.11605 34.8984 8.39693C34.879 9.67782 33.8218 10.6967 32.5416 10.687C31.271 10.6676 30.2526 9.63901 30.2526 8.36782C30.2526 7.08693 31.3001 6.03893 32.5901 6.04864C32.6095 6.03893 32.6192 6.03893 32.6192 6.03893ZM30.8346 12.8509H34.4135V26.7757H30.8346V12.8509Z" fill="var(--color-primary)"/>
      <path d="M47.497 12.9388L46.2459 16.1119C45.7124 15.8887 45.1305 15.7723 44.5485 15.7917C43.2392 15.8208 42.0365 16.5292 41.3867 17.6742V26.7763H37.8078V12.8514H41.2024V14.8795C41.9783 13.4628 43.4332 12.57 45.0432 12.5021C45.887 12.5118 46.7114 12.6671 47.497 12.9388Z" fill="var(--color-primary)"/>
      <path d="M56.8181 18.1979C53.7532 17.1402 50.2907 15.5003 50.2907 11.677C50.2907 8.76591 52.9094 5.8548 57.1187 5.8548C59.7472 5.89362 62.2301 7.08717 63.9177 9.11525L61.4445 11.5218C60.397 10.1729 58.8257 9.32873 57.1187 9.20258C55.3341 9.20258 53.9278 10.2894 53.9278 11.6673C53.9278 13.4625 55.5669 14.0156 58.4281 15.0733C61.619 16.2475 64.2669 17.6545 64.2669 21.3904C64.2669 25.1264 60.9304 27.1156 56.9926 27.1156C53.8987 27.0962 51.0278 25.5145 49.3596 22.9139L52.0462 20.6821C52.0462 20.6821 53.8308 23.7678 56.9926 23.7678C58.7773 23.7678 60.6298 23.0595 60.6298 21.3904C60.6395 19.6729 59.301 19.0518 56.8181 18.1979Z" fill="var(--color-primary)"/>
      <path d="M79.1747 17.7033V26.7763H75.8673V25.0102C74.7325 26.4075 73.0061 27.1838 71.2118 27.1256C68.5931 27.3197 66.3235 25.3498 66.1296 22.7395C66.1199 22.6425 66.1199 22.5552 66.1199 22.4581C66.1199 19.7799 68.5931 17.8489 71.6677 17.8489C73.0449 17.7809 74.4222 18.1303 75.6055 18.8483V18.0526C75.6055 16.2283 73.8208 15.6461 72.5697 15.6461C71.1051 15.714 69.6697 16.0634 68.3409 16.6747L67.1771 13.7636C68.9326 12.9776 70.8239 12.5506 72.754 12.5021C76.7887 12.5021 79.1747 14.5302 79.1747 17.7033ZM75.5958 22.5746V21.1384C74.5871 20.6629 73.4911 20.4203 72.3757 20.43C71.27 20.43 69.757 20.8958 69.757 22.3999C69.757 23.8652 71.2215 24.1951 72.3175 24.1951C73.5978 24.1757 74.8101 23.5837 75.5958 22.5746Z" fill="var(--color-primary)"/>
      <path d="M94.4013 17.7033V26.7763H91.0939V25.0102C89.9591 26.4075 88.2327 27.1838 86.4384 27.1256C83.8197 27.3197 81.5501 25.3498 81.3562 22.7395C81.3465 22.6425 81.3465 22.5552 81.3465 22.4581C81.3465 19.7799 83.8197 17.8489 86.8943 17.8489C88.2715 17.7809 89.6488 18.1303 90.832 18.8483V18.0526C90.832 16.2283 89.0474 15.6461 87.7963 15.6461C86.3317 15.714 84.8963 16.0634 83.5675 16.6747L82.4036 13.7636C84.1592 12.9776 86.0505 12.5506 87.9806 12.5021C92.0153 12.5021 94.4013 14.5302 94.4013 17.7033ZM90.8223 22.5746V21.1384C89.8137 20.6629 88.7177 20.4203 87.6023 20.43C86.4966 20.43 84.9836 20.8958 84.9836 22.3999C84.9836 23.8652 86.4481 24.1951 87.5441 24.1951C88.8244 24.1757 90.0367 23.5837 90.8223 22.5746Z" fill="var(--color-primary)"/>
      <path d="M98.3398 22.0409C99.4746 23.2053 100.988 23.9137 102.598 24.0398C104.062 24.0398 105.284 23.6323 105.284 22.7783C105.284 21.8662 104.625 21.6915 102.481 21.2549C99.6782 20.6726 97.2341 19.4888 97.2341 16.8494C97.2341 14.6757 99.4455 12.5021 103.315 12.5021C105.216 12.5021 107.069 13.094 108.621 14.21L106.836 16.7912C105.798 16.0634 104.586 15.6461 103.315 15.5879C101.977 15.5879 100.755 16.0537 100.755 16.9076C100.755 17.7615 101.705 17.9653 104.091 18.4602C106.894 19.0424 108.892 19.9546 108.892 22.8366C108.892 25.214 106.332 27.1256 102.724 27.1256C100.347 27.1741 98.0488 26.262 96.3418 24.6026L98.3398 22.0409Z" fill="var(--color-primary)"/>
    </svg>
  );
}

export function Footer({
  columns,
  copyright = "Made with love in France | © 2025 AirSaas · Mentions légales · Confidentialité",
  className,
}: FooterProps) {
  return (
    <footer
      className={cn("bg-white px-[1.5rem] py-[3rem] md:px-[3rem] md:py-[4rem] lg:px-[8.125rem] lg:py-[6.25rem]", className)}
    >
      <div
        className="relative rounded-[1.25rem] md:rounded-[1.5625rem] bg-primary-2 px-[1.35rem] py-[2.5rem] md:px-[2.7rem] md:py-[3rem] lg:px-[9.5625rem] lg:py-[3.375rem] overflow-visible"
      >
        {/* Logo floating card — top left */}
        <div
          className="absolute -top-[1.875rem] left-[1rem] md:-left-[1.5rem] lg:-left-[3.125rem] bg-white rounded-[1.25rem] p-[1rem_1.5rem]"
          style={{
            boxShadow: "0px 8px 40px 0px rgba(58, 81, 226, 0.08), 0px 2px 12px 0px rgba(0, 0, 0, 0.04)",
          }}
          aria-hidden="true"
        >
          <AirSaasLogo />
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 gap-[2rem] sm:grid-cols-2 lg:grid-cols-4 lg:gap-[2.5rem] items-start mt-[1rem]">
          {columns.map((col, i) => (
            <div key={i} className="flex flex-col">
              <span
                className="font-bold text-primary text-[1.02rem] md:text-[1.33rem]"
                style={{ lineHeight: "1.2", marginBottom: "0.5rem" }}
              >
                {col.title}
              </span>
              {col.links?.map((link, j) => (
                <a
                  key={j}
                  href={link.href ?? "#"}
                  className="font-light text-foreground transition-colors hover:text-primary text-[0.765rem] md:text-[0.956rem]"
                  style={{ lineHeight: "2.04" }}
                >
                  {link.label}
                </a>
              ))}
              {col.sections?.map((section, s) => (
                <div key={s} className="flex flex-col" style={{ marginTop: "1rem" }}>
                  <span
                    className="font-bold text-primary text-[0.935rem] md:text-[1.148rem]"
                    style={{ lineHeight: "1.2", marginBottom: "0.5rem" }}
                  >
                    {section.title}
                  </span>
                  {section.links.map((link, j) => (
                    <a
                      key={j}
                      href={link.href ?? "#"}
                      className="font-light text-foreground transition-colors hover:text-primary text-[0.765rem] md:text-[0.956rem]"
                      style={{ lineHeight: "2.04" }}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom floating card — copyright */}
        <div className="relative mt-[2rem] lg:absolute lg:mt-0 lg:-bottom-[2.5rem] lg:right-[4rem]">
          <FloatingCard>
            <div className="flex items-center gap-[0.625rem] md:gap-[0.888rem] p-[0.75rem] md:p-[0.9375rem]">
              <div className="flex h-[2.5rem] w-[2.5rem] md:h-[3.198rem] md:w-[3.198rem] shrink-0 items-center justify-center rounded-[0.625rem] md:rounded-[0.888rem] bg-primary-5">
                <span style={{ fontSize: "1.25rem" }}>🇫🇷</span>
              </div>
              <span
                className="text-foreground whitespace-normal text-[0.68rem] md:text-[0.85rem] leading-[1.3]"
              >
                {copyright}
              </span>
            </div>
          </FloatingCard>
        </div>
      </div>
    </footer>
  );
}
