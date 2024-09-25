'use client'

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "../ui/button";
import { Languages } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const LocaleToggle = () => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const localeActive = useLocale();

    const onSelectChange = (nextLocale: string) => {
        startTransition(() => {
            const currentPath = window.location.pathname;
            let urlWithoutLocale = '';
            if (currentPath === '/en' || currentPath === '/ar' || currentPath === '/fr') {
                urlWithoutLocale = '/';
            } else {
                urlWithoutLocale = currentPath.replace(/^\/[a-z]{2}\//, '/'); // Remove locale prefix
            }

            router.replace(`/${nextLocale}/${urlWithoutLocale}`);
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="relative flex justify-center items-center "
                >
                    <Languages
                        className="h-[1.2rem] w-[1.2rem]"
                    />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem disabled={localeActive === 'en'} onClick={() => onSelectChange('en')}>English</DropdownMenuItem>
                <DropdownMenuItem disabled={localeActive === 'fr'} onClick={() => onSelectChange('fr')}>Français</DropdownMenuItem>
                <DropdownMenuItem disabled={localeActive === 'ar'} onClick={() => onSelectChange('ar')}>العربية</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default LocaleToggle;
