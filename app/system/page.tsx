import { BackButton } from "@/components/back-button";
import { Footer } from "@/components/footer";
import { Image } from "@/components/image";
import { ImageModal } from "@/components/image-modal";
import { ImageToggle } from "@/components/image-toggle";
import { LayoutGrid } from "@/components/layout-grid";
import { LinkOut } from "@/components/link-out";
import { ModeToggle } from "@/components/mode-toggle";
import { Stats } from "@/components/stats";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

export default function System() {
	return (
		<div className="mt-10 flex flex-col gap-10">
			<Heading level={1}>bob.components</Heading>
			<Separator />
			<Heading>Tokens</Heading>
			<div className="bg-muted flex flex-wrap gap-5 rounded-lg p-4">
				<div className="bg-background shadow-xs h-20 w-40 rounded-sm" />
				<div className="bg-background h-20 w-40 rounded-sm shadow-sm" />
				<div className="bg-background h-20 w-40 rounded-sm shadow-md" />
				<div className="bg-background h-20 w-40 rounded-sm shadow-lg" />
				<div className="bg-background h-20 w-40 rounded-sm shadow-xl" />
			</div>
			<Separator />
			<Heading>Components</Heading>
			<div className="space-y-8">
				<section className="space-y-2">
					<Heading level={3}>BackButton</Heading>
					<BackButton />
				</section>

				<section className="space-y-2">
					<Heading level={3}>Footer</Heading>
					<Footer />
				</section>

				<section className="space-y-2">
					<Heading level={3}>Image</Heading>
					<Image src="/assets/share.png" alt="Example image" />
				</section>

				<section className="space-y-2">
					<Heading level={3}>ImageModal</Heading>
					<ImageModal src="/assets/share.png" caption="Click to zoom" />
				</section>

				<section className="space-y-2">
					<Heading level={3}>ImageToggle</Heading>
					<ImageToggle
						before="/assets/share.png"
						after="/assets/share.png"
						tab1="Light"
						tab2="Dark"
					/>
				</section>

				<section className="space-y-2">
					<Heading level={3}>LayoutGrid</Heading>
					<LayoutGrid variant="threeUp">
						<div className="bg-muted h-20 rounded-lg" />
						<div className="bg-muted h-20 rounded-lg" />
						<div className="bg-muted h-20 rounded-lg" />
					</LayoutGrid>
				</section>

				<section className="space-y-2">
					<Heading level={3}>LinkOut</Heading>
					<p>
						Check out{" "}
						<LinkOut
							text="Figma"
							href="https://figma.com"
							src="/assets/logos/udl-icon.svg"
						/>{" "}
						for design work.
					</p>
				</section>

				<section className="space-y-2">
					<Heading level={3}>ModeToggle</Heading>
					<ModeToggle />
				</section>

				<section className="space-y-2">
					<Heading level={3}>Stats</Heading>
					<Stats
						data={[
							{ label: "Components", value: "128", change: "12% from last quarter" },
							{ label: "Adoption", value: "94%", change: "3% from last quarter" },
							{ label: "Tokens", value: "312", change: "8% from last quarter" },
						]}
					/>
				</section>
			</div>
		</div>
	);
}
