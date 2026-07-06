export const CART_DRAWER_ID = "cart-drawer";

const STANDARD_ACTIONS_READY_EVENT = "DOMContentLoaded";

let openCartActionConfigured = false;
let openCartActionRetryQueued = false;

function getCartDrawer() {
  if (typeof document === "undefined") return null;

  const drawer = document.getElementById(CART_DRAWER_ID);
  return drawer instanceof HTMLDialogElement ? drawer : null;
}

export function openCartDrawer() {
  const drawer = getCartDrawer();
  if (!drawer || drawer.open) return;
  drawer.showModal();
}

export function closeCartDrawer() {
  getCartDrawer()?.close();
}

function configureOpenCartActionNow() {
  const shopify = (window as Window & { Shopify?: { actions?: { openCart?: { configure: (options: { handler: () => void | Promise<void> }) => void } } } }).Shopify;
  const openCart = shopify?.actions?.openCart;
  if (!openCart) return false;

  openCart.configure({
    handler: async () => openCartDrawer(),
  });
  openCartActionConfigured = true;
  return true;
}

export function configureOpenCartAction() {
  if (typeof document === "undefined" || openCartActionConfigured) return;
  if (configureOpenCartActionNow()) return;
  if (openCartActionRetryQueued || document.readyState !== "loading") return;

  openCartActionRetryQueued = true;
  document.addEventListener(
    STANDARD_ACTIONS_READY_EVENT,
    () => {
      openCartActionRetryQueued = false;
      configureOpenCartAction();
    },
    { once: true },
  );
}

configureOpenCartAction();
