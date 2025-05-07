import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Card as CARD } from "./section";
export default function CardComponent({ card }: { card: CARD }) {
    return (
        <>
            <Card className="text-primary-foreground bg-background min-w-36 sm:w-40 h-40">
                <CardHeader>{card.image}</CardHeader>
                <CardContent>
                    <CardDescription>{card.text}</CardDescription>
                </CardContent>
            </Card>
        </>
    )
}
