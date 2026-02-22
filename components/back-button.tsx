"use client";

import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { Button } from "./ui/button";

export function BackButton() {
	return (
		<Button variant="link" render={<Link href="/#projects" />} nativeButton={false} className="group sm:-ms-6">
			<IconArrowLeft className="transition-transform group-hover:-translate-x-0.5" data-icon="inline-start" />
			Back
		</Button>
	);
}
