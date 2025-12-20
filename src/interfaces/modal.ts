export interface IModal {
  isOpen: boolean;
  onBaseChange: (base: number) => void;
  onCancel: () => void;
  onConfirm: () => void;
}
