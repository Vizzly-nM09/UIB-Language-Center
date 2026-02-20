import { create } from "zustand";

interface NotificationItem {
  status: string;
  icon: string;
  header: string;
  message: string;
  duration?: number;
}

interface NotificationState {
  queue: NotificationItem[];
  current: NotificationItem | null;
  visible: boolean;
  show: (notification: NotificationItem) => void;
  hide: () => void;
}

export const useNotifikasi = create<NotificationState>((set, get) => ({
  queue: [],
  current: null,
  visible: false,

  show: (notification) => {
    const { visible, current, queue } = get();

    const duration = notification.duration ?? 3000; // default 3s

    if (!visible && !current) {
      set({ current: notification, visible: true });

      setTimeout(() => {
        get().hide();
      }, duration);
    } else {
      set({ queue: [...queue, notification] });
    }
  },

  hide: () => {
    const { queue } = get();
    set({ visible: false });

    setTimeout(() => {
      if (queue.length > 0) {
        const [next, ...rest] = queue;
        set({ current: next, queue: rest, visible: true });

        const nextDuration = next.duration ?? 3000;
        setTimeout(() => {
          get().hide();
        }, nextDuration);
      } else {
        set({ current: null });
      }
    }, 300); // animation delay
  },
}));
