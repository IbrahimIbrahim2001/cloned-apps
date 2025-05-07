import { LucideProps } from "lucide-react"

export interface LinkItemsProps {
    item: {
        title: string,
        icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>,
        url: string
    }
}