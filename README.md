# Kalma Web App

This repo is for our thesis purpose. Making mental healt admin management.

## Technologies Used

- [Next.js 14](https://nextjs.org/docs/getting-started)
- [NextUI v2](https://nextui.org/)
- [Tanstack Query](https://tanstack.com/)
- [Axios](https://axios-http.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [next-themes](https://github.com/pacocoursey/next-themes)

## How to Use

- Please run npm install before start.
- Please write code inside locale folder to use localization functionality.
- Please add your static message inside locales folder inside public. For more information you can read the provided example or contact the author.
- To use the internalization inside the component you can use useTranslation hook from next-intl and get your message path.
- Please use default function when working on component and arrow function in other functions.
- Please use custom useRouter, usePathName, and Link from navigation file instead of next/link or next/navigation
- Please use react icons for the icon.
- Please if you want use image background do not use it directly from tailwind class or css sheet, use Next Image as a normal image and make the position is relative. This one is to make the performance gets better. You can see the example in welcome-jumbotron component for this.
