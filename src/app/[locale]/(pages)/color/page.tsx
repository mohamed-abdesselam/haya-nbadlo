import Container from '@/components/container';
import { useTranslations } from 'next-intl';

const colors = {
  border: "hsl(var(--border))",
  input: "hsl(var(--input))",
  ring: "hsl(var(--ring))",
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  primary: {
    DEFAULT: "hsl(var(--primary))",
    foreground: "hsl(var(--primary-foreground))",
  },
  secondary: {
    DEFAULT: "hsl(var(--secondary))",
    foreground: "hsl(var(--secondary-foreground))",
  },
  destructive: {
    DEFAULT: "hsl(var(--destructive))",
    foreground: "hsl(var(--destructive-foreground))",
  },
  muted: {
    DEFAULT: "hsl(var(--muted))",
    foreground: "hsl(var(--muted-foreground))",
  },
  accent: {
    DEFAULT: "hsl(var(--accent))",
    foreground: "hsl(var(--accent-foreground))",
  },
  popover: {
    DEFAULT: "hsl(var(--popover))",
    foreground: "hsl(var(--popover-foreground))",
  },
  card: {
    DEFAULT: "hsl(var(--card))",
    foreground: "hsl(var(--card-foreground))",
  },
};

const ColorPage = () => {
const t = useTranslations('Colors');

  return (
    <div className="pt-8">
      <Container>
        <h1 className="text-2xl mb-4">{t('title')}</h1>
        <p className="mb-6">{t('description')}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(colors).map(([colorName, colorValue]) => (
            <div key={colorName} className="p-4 border rounded-lg border-border bg-background">
              <h2 className="text-xl mb-2">{colorName}</h2>
              <p className="text-sm mb-5  ">
                {
                  {
                    border: "Used for borders and dividers.",
                    input: "Used for input fields and form controls.",
                    ring: "Used for focus rings and outline borders.",
                    background: "Used for background colors of the main content.",
                    foreground: "Used for text and other foreground elements.",
                    primary: "Used for primary actions and main UI elements.",
                    secondary: "Used for secondary actions and supporting UI elements.",
                    destructive: "Used for error messages and destructive actions.",
                    muted: "Used for less prominent or secondary information.",
                    accent: "Used for highlights and accent details.",
                    popover: "Used for background of popovers and tooltips.",
                    card: "Used for card backgrounds and card components.",
                  }[colorName] || "Description not available."
                }
              </p>
              {typeof colorValue === 'string' ? (
                <div className="flex flex-col items-center">
                  <div
                    className="w-16 h-16 mb-2"
                    style={{ backgroundColor: colorValue }}
                  ></div>
                  {/* <code>{colorValue}</code> */}
                  <div className="mb-4 p-2 border rounded-md" style={{ borderColor: colorValue }}>
                    <p className="text-center">Example Box with {colorName}</p>
                  </div>
                </div>
              ) : (
                Object.entries(colorValue).map(([shade, shadeValue]) => (
                  <div key={shade} className="flex flex-col items-center mb-2">
                    <div
                      className="w-16 h-16 mb-2"
                      style={{ backgroundColor: shadeValue }}
                    ></div>
                    {/* <code>{`${colorName}-${shade}: ${shadeValue}`}</code> */}
                    <div className="mb-4 p-2 border rounded-md" style={{ borderColor: shadeValue }}>
                      <p className="text-center">Example Box with {colorName}-{shade}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ColorPage;
