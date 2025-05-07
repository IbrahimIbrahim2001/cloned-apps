import { LucideProps } from "lucide-react"

export type LinkItem = {
    title: string,
    url: string,
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>,
}