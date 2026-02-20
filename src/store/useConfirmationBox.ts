import { create } from "zustand";

export interface ConfirmationOptions {
  title: string;
  message: string;
  icon?: string;
  confirmButtonText?: string;
  confirmButtonColor?: string;
  cancelButtonText?: string;
  showCancelButton?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface ConfirmationState {
  open: boolean;
  options: ConfirmationOptions | null;
  show: (options: ConfirmationOptions) => void;
  confirm: () => void;
  cancel: () => void;
}

export const useConfirmation = create<ConfirmationState>((set, get) => ({
  open: false,
  options: null,

  show: (options) => {
    set({ open: true, options });
  },

  confirm: () => {
    const options = get().options;
    options?.onConfirm?.();
    set({ open: false, options: null });
  },

  cancel: () => {
    const options = get().options;
    options?.onCancel?.();
    set({ open: false, options: null });
  },
}));
