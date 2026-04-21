import { useToastContext } from "./parts/ToastContext";

export const useToast = () => {
    const { toast, hide, show } = useToastContext();
    
    return { toast, hide, show };
}