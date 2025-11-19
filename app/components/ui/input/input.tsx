import * as React from "react";
import { cn } from "@/lib/cn";

export type InputProps = React.ComponentProps<"input">;

function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        '"flex border-input bg-background text-foreground file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring disabled:opacity-50" h-9 w-full rounded-md border px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed',
        className
      )}
      {...props}
    />
  );
}

// NumberInput
export type NumberInputProps = Omit<
  InputProps,
  "type" | "onChange" | "value"
> & {
  value?: number | string;
  onChange?: (value: number | undefined) => void;
  allowNegative?: boolean;
  allowDecimal?: boolean;
  decimalPlaces?: number;
  formatOnBlur?: boolean;
};

function NumberInput({
  value,
  onChange,
  onBlur,
  allowNegative = false,
  allowDecimal = false,
  decimalPlaces = 2,
  formatOnBlur = true,
  className,
  ...props
}: NumberInputProps) {
  const [displayValue, setDisplayValue] = React.useState<string>(() => {
    if (value === undefined || value === null || value === "") return "";
    return String(value);
  });

  // 数値をフォーマット（桁区切り）
  const formatNumber = (num: number): string => {
    if (allowDecimal) {
      return num.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: decimalPlaces,
      });
    }
    return num.toLocaleString("en-US");
  };

  // 文字列から数値をパース（カンマを除去）
  const parseNumber = (str: string): number | undefined => {
    const cleaned = str.replace(/,/g, "");
    if (cleaned === "" || cleaned === "-") return undefined;
    const num = Number(cleaned);
    return isNaN(num) ? undefined : num;
  };

  // 入力制限: 数値、マイナス、小数点、カンマのみ
  const isValidInput = (input: string): boolean => {
    let pattern = "^-?[0-9,]*";
    if (allowDecimal) {
      pattern += "\\.?[0-9]*";
    }
    pattern += "$";
    const regex = new RegExp(pattern);

    if (!regex.test(input)) return false;

    // マイナスは先頭のみ
    if (!allowNegative && input.includes("-")) return false;
    if (input.indexOf("-") > 0) return false;

    // 小数点は1つまで
    if ((input.match(/\./g) || []).length > 1) return false;

    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    // 入力制限チェック
    if (!isValidInput(input)) return;

    setDisplayValue(input);

    // onChange: 数値としてパース（カンマを除去して）
    const numValue = parseNumber(input);
    onChange?.(numValue);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const numValue = parseNumber(displayValue);

    if (formatOnBlur && numValue !== undefined) {
      // フォーマット適用（桁区切り）
      const formatted = formatNumber(numValue);
      setDisplayValue(formatted);
    } else if (numValue === undefined && displayValue !== "") {
      // 不正な入力の場合は空にする
      setDisplayValue("");
      onChange?.(undefined);
    }

    onBlur?.(e);
  };

  // 外部からのvalue変更を反映
  React.useEffect(() => {
    if (value === undefined || value === null || value === "") {
      setDisplayValue("");
      return;
    }
    const num = typeof value === "number" ? value : parseNumber(String(value));
    if (num !== undefined) {
      setDisplayValue(formatNumber(num));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <input
      type="text"
      inputMode="decimal"
      value={displayValue}
      onChange={handleChange}
      onBlur={handleBlur}
      className={cn(
        '"flex border-input bg-background text-foreground file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring disabled:opacity-50" h-9 w-full rounded-md border px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed',
        className
      )}
      {...props}
    />
  );
}

export { Input, NumberInput };
