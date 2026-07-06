"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";

import { formatPrice } from "@/lib/format-price";
import { useCart, useCartForm } from "@/lib/cart";

interface CartLineItemProps {
  line: {
    id: string;
    quantity: number;
    cost: {
      totalAmount: { amount: string; currencyCode: string };
    };
    merchandise?: {
      id?: string;
      title?: string;
      image?: { url: string; altText?: string | null } | null;
      product?: { title?: string; handle?: string };
      selectedOptions?: { name: string; value: string }[];
    } | null;
  };
}

export function HydrogenCartLineItem({ line }: CartLineItemProps) {
  const { formProps, register } = useCartForm();
  const pendingLines = useCart((state) => state.pending.lines);
  const lineErrors = useCart((state) => state.errors.lines.get(line.id));
  const isPending = pendingLines.has(line.id);

  const merchandise = line.merchandise;
  const title = merchandise?.product?.title ?? merchandise?.title ?? "Product";
  const handle = merchandise?.product?.handle;
  const imageUrl = merchandise?.image?.url ?? "/assets/longan-fruit.png";
  const optionLabel = merchandise?.selectedOptions
    ?.filter((option) => option.value !== "Default Title")
    .map((option) => option.value)
    .filter(Boolean)
    .join(" · ");

  return (
    <li className="py-4">
      <div className="flex gap-4">
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-fr-cream">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt={merchandise?.image?.altText ?? title} className="h-full w-full object-cover" />
        </div>

        <div className="flex flex-1 flex-col">
          <div className="flex items-start justify-between gap-2">
            <div>
              {handle ? (
                <Link
                  href={`/products/${handle}`}
                  className="font-heading text-base font-semibold leading-snug text-fr-ink transition-colors hover:text-fr-teal"
                >
                  {title}
                </Link>
              ) : (
                <h3 className="font-heading text-base font-semibold leading-snug text-fr-ink">{title}</h3>
              )}
              {optionLabel ? (
                <p className="mt-0.5 font-mono text-xs text-fr-muted">{optionLabel}</p>
              ) : null}
            </div>

            <form {...formProps()}>
              <button {...register("set")} />
              <input type="hidden" {...register("lineId", { value: line.id })} />
              <input type="hidden" {...register("quantity", { value: line.quantity })} />
              <button
                type="submit"
                {...register("remove")}
                aria-label={`Remove ${title}`}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-fr-muted transition-colors hover:bg-fr-wash hover:text-fr-ink"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </form>
          </div>

          <form {...formProps()} className="mt-auto flex items-center justify-between pt-2">
            <button {...register("set")} />
            <input type="hidden" {...register("lineId", { value: line.id })} />

            <div className="inline-flex items-center rounded-full border border-fr-border">
              <button
                type="submit"
                {...register("decrease")}
                aria-label="Decrease quantity"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-fr-teal transition-colors hover:bg-fr-wash"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <input
                {...register("quantity", { value: line.quantity, interactive: true })}
                className={`w-8 border-0 bg-transparent text-center font-mono text-sm font-medium text-fr-ink focus:outline-none ${isPending ? "opacity-30" : ""}`}
                aria-invalid={lineErrors ? true : undefined}
                aria-describedby={lineErrors ? `line-error-${line.id}` : undefined}
              />
              <button
                type="submit"
                {...register("increase")}
                aria-label="Increase quantity"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-fr-teal transition-colors hover:bg-fr-wash"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>

            <span
              className={`font-mono text-sm font-semibold text-fr-teal ${isPending ? "opacity-30" : ""}`}
            >
              {formatPrice(line.cost.totalAmount)}
            </span>
          </form>

          {lineErrors?.userErrors.map((error) => (
            <p
              key={error.message}
              id={`line-error-${line.id}`}
              role="alert"
              className="mt-2 text-sm text-red-600"
            >
              {error.message}
            </p>
          ))}
        </div>
      </div>
    </li>
  );
}
