import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface ShowcaseCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function ShowcaseCard({ title, children, className = "" }: ShowcaseCardProps) {
  return (
    <Card className={`${className}`}>
      <CardHeader className="border-b border-border">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          {children}
        </div>
      </CardContent>
    </Card>
  );
} 