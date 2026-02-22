"use client";

import { ImageModal } from "@/components/image-modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ImageToggleProps {
	before: string;
	after: string;
	tab1?: string;
	tab2?: string;
}

export function ImageToggle({ before, after, tab1 = "Before", tab2 = "After" }: ImageToggleProps) {
	return (
		<Tabs className="justify-center">
			<TabsList className="mx-auto">
				<TabsTrigger value="before">{tab1}</TabsTrigger>
				<TabsTrigger value="after">{tab2}</TabsTrigger>
			</TabsList>
			<TabsContent value="after" keepMounted>
				<ImageModal src={after} />
			</TabsContent>
			<TabsContent value="before" keepMounted>
				<ImageModal src={before} />
			</TabsContent>
		</Tabs>
	);
}
