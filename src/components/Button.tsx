import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge"; //twMerge takes two parameters, both tailwind css classes, and makes sure they merge correctly. the second parameter will always have priority and override the first parameter

//cva takes two parameters : array of css classes to apply to all buttons and an object that's for variants for different types of buttons
export const buttonStyle = cva(["transition-colors"], {
  variants: {
    buttonType: {
      default: ["bg-secondary", "hover:bg-secondary-hover"],
      noBackground: ["hover:bg-gray-100"],
      dark: [
        "bg-secondary-dark",
        "hover:bg-secondary-dark-hover",
        "text-secondary",
      ],
    },
    size: {
      default: ["rounded", "p-2"],
      icon: [
        "rounded-full",
        "w-10",
        "h-10",
        "flex",
        "items-center",
        "justify-center",
        "p-2.5",
      ],
    },
  },
  defaultVariants: {
    buttonType: "default",
    size: "default",
  },
});

type ButtonProps = VariantProps<typeof buttonStyle> & ComponentProps<"button">;

export const Button = ({
  buttonType,
  size,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={twMerge(buttonStyle({ buttonType, size }), className)}
    />
  );
};
