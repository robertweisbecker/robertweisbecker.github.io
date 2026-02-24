"use client";

import { Fragment } from "react";
import Link from "next/link";
import {
	IconUser,
	IconCamera,
	IconWand,
	IconBriefcase,
	IconBookmark,
	IconPointer,
	IconMail,
	IconBrandLinkedin,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
	DataList,
	DataListLabel,
	DataListValue,
} from "@/components/ui/data-list";
import { LayoutGrid } from "@/components/layout-grid";
import { LinkOut } from "@/components/link-out";
import { Heading } from "@/components/ui/heading";
import { GithubIcon } from "@/components/icons";

export default function About() {
	return (
		<div className="prose mt-10 flex flex-col gap-10">
			<Heading level={1} className="sr-only">
				About
			</Heading>

			<LayoutGrid variant="oneThird">
				<div className="flex items-center gap-1">
					<IconUser className="text-muted-foreground size-4" />
					<p>Who</p>
				</div>
				<div className="flex flex-col gap-4">
					<p>
						I&apos;m currently a principal designer at{" "}
						<LinkOut href="https://everfi.com" text="Everfi" />, designing
						products, components, and tooling to help drive social good through
						education. These things have{" "}
						<LinkOut
							href="https://www.blackbaud.com/newsroom/article/blackbaud-acquires-everfi-a-saas-leader-powering-corporate-esg-and-csr-initiatives-that-reach-millions-of-learners-each-year"
							text="allegedly"
						/>{" "}
						reached more than 45 million learners globally.
					</p>
					<p>
						Since 2021, I&apos;ve been leading the implementation of a unified
						design system across admin, educator, and learner products. Read a
						bit about that process{" "}
						<Link href="/unified-design-language">here</Link>.
					</p>
					<p>You can also find or reach me here:</p>
					<div className="mb-8 flex flex-wrap gap-4">
						<Button
							render={<a href="mailto:yo@bob.fyi" />}
							nativeButton={false}
							variant="elevated"
							size="sm"
						>
							<IconMail data-icon="inline-start" />
							Email
						</Button>
						<Button
							render={
								<a
									href="https://www.linkedin.com/in/robertweisbecker/"
									target="_blank"
									rel="noopener noreferrer"
								/>
							}
							nativeButton={false}
							variant="elevated"
							size="sm"
						>
							<IconBrandLinkedin data-icon="inline-start" />
							LinkedIn
						</Button>
						<Button
							render={
								<a
									href="https://github.com/robertweisbecker"
									target="_blank"
									rel="noopener noreferrer"
								/>
							}
							nativeButton={false}
							variant="elevated"
							size="sm"
						>
							<GithubIcon data-icon="inline-start" />
							Github
						</Button>
					</div>
				</div>
			</LayoutGrid>

			<LayoutGrid variant="oneThird">
				<div className="flex items-center gap-2">
					<IconCamera className="text-muted-foreground size-4" />
					<p>
						What{" "}
						<span className="text-muted-foreground font-normal">
							(I look like)
						</span>
					</p>
				</div>
				<div>
					<img
						src="/assets/headshot2.png"
						alt="Bob Weisbecker headshot"
						className="w-full max-w-sm rounded-2xl shadow-sm"
					/>
					<p className="text-muted-foreground mt-2 text-xs italic">Moody!</p>
				</div>
			</LayoutGrid>

			<LayoutGrid variant="oneThird">
				<div className="flex items-center gap-2">
					<IconWand className="text-muted-foreground size-4" />
					<p>
						What
						<span className="text-muted-foreground font-normal">
							{" "}
							(I&apos;ve done)
						</span>
					</p>
				</div>
				<div className="flex flex-col gap-4">
					<p>
						Starting in 2018, I led the creation of our product
						organization&apos;s{" "}
						<Link className="link" href="/unified-design-language">
							first design system
						</Link>
						, shepherding its transition from an unstyled SDK into an accessible
						component library with theming and tooling to support 80+ courses
						across a dozen branded product lines.
					</p>
					<p>Some other things I&apos;ve done:</p>
					<ul className="list-disc space-y-3 ps-5">
						<li>
							Led design efforts for adult &amp; K12 e-learning courses at
							EVERFI, including{" "}
							<LinkOut
								href="https://everfi.com/financial-education/consumers/"
								text="Achieve"
							/>
							,{" "}
							<LinkOut
								href="https://everfi.com/financial-education/consumers/engage/"
								text="Engage"
							/>
							, and{" "}
							<LinkOut
								href="https://everfi.com/courses/k-12/teaching-data-science-in-high-school/"
								text="Data Science for High Schoolers"
							/>
							.
						</li>
						<li>
							Worked on education products for customers such as Google, Meta,
							LinkedIn, Kroger, Beyond Meat, Truist, and more.
						</li>
						<li>
							Delivered a (now relevant!){" "}
							<Link className="link" href="/conversational-immigration-forms">
								thesis
							</Link>{" "}
							on chatbots and conversational interface design at{" "}
							<LinkOut
								href="https://www.mica.edu/graduate-programs/ux-design-mps/"
								text="MICA"
							/>
						</li>
						<li>
							Built a{" "}
							<Link className="link" href="/npr-maps">
								mapping application
							</Link>{" "}
							at NPR when I wasn&apos;t busy{" "}
							<LinkOut
								href="https://youtu.be/lgmw41CY1Fo?t=36"
								text="standing awkwardly"
							/>{" "}
							in the background of Tiny Desk recordings
						</li>
						<li>
							Designed web &amp; iOS screens, performed user testing, and made
							some{" "}
							<LinkOut
								text="social media assets"
								href="https://twitter.com/ParkingPanda/status/617057417696833536?s=20"
							/>{" "}
							for{" "}
							<LinkOut
								href="https://www.parkingpanda.com"
								text="Parking Panda"
							/>
						</li>
					</ul>
				</div>
			</LayoutGrid>
			<LayoutGrid variant="oneThird" className="not-prose">
				<h2 className="mt-0">Work</h2>
				<DataList>
					<DataListLabel className="font-mono">2024</DataListLabel>
					<DataListValue>Blackbaud / Principal Designer</DataListValue>
					{[
						["2022", "Principal Designer, Design Systems"],
						["2022", "Principal Designer, Platform UX"],
					].map(([year, title]) => (
						<Fragment key={title}>
							<DataListLabel className="font-mono">{year}</DataListLabel>
							<DataListValue>{title}</DataListValue>
						</Fragment>
					))}
					{[
						["2020", "Senior Interaction Designer"],
						["2018", "Interaction Designer"],
						["2017", "UX Designer"],
						["2017", "Product Design Intern"],
					].map(([year, title]) => (
						<Fragment key={title}>
							<DataListLabel className="font-mono">{year}</DataListLabel>
							<DataListValue>{title}</DataListValue>
						</Fragment>
					))}

					<DataListLabel className="font-mono">2017</DataListLabel>
					<DataListValue className="flex flex-col">
						NPR Labs
						<span className="text-muted-foreground">
							Research &amp; Development Design Intern
						</span>
					</DataListValue>
					<DataListLabel className="font-mono">2015</DataListLabel>
					<DataListValue className="flex flex-col">
						Parking Panda
						<span className="text-muted-foreground">UX/Design Intern</span>
					</DataListValue>
				</DataList>
			</LayoutGrid>
			<LayoutGrid variant="oneThird" className="not-prose">
				<h2 className="mt-0">Education</h2>
				<DataList>
					<DataListLabel className="font-mono">2016–2017</DataListLabel>
					<DataListValue className="flex flex-col">
						Maryland Institute College of Art
						<span className="text-muted-foreground">
							Master&apos;s, UX Design
						</span>
					</DataListValue>
					<DataListLabel className="self-start font-mono">
						2012–2016
					</DataListLabel>
					<DataListValue className="flex flex-col">
						University of Michigan, Ann Arbor
						<span className="text-muted-foreground">BA, Cognitive Science</span>
						<span className="text-muted-foreground">
							Minor, Art &amp; Design
						</span>
					</DataListValue>
				</DataList>
			</LayoutGrid>
		</div>
	);
}
