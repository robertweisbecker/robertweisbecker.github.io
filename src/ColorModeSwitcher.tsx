import * as React from "react";
import {
	useColorMode,
	useColorModeValue,
	IconButton,
	IconButtonProps,
	DarkMode,
	Toast,
	useToast,
	Tooltip,
	HStack,
	Switch,
	Button,
	Icon,
	Center,
	FormControl,
	FormLabel,
	VisuallyHidden,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">;

export const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = (props) => {
	const { colorMode, toggleColorMode } = useColorMode();
	const text = useColorModeValue("Dark", "Light");
	const SwitchIcon = useColorModeValue(MoonIcon, SunIcon);
	const variant = useColorModeValue("ghost", "ghost");
	const colorScheme = useColorModeValue("brand", "orange");
	// const color = useColorModeValue("orange.500", "white");
	// const iconPosition = useColorModeValue("50%", "4px");

	const toast = useToast({
		description: `Switched to ${text} mode.`,
		// status: "success",
		isClosable: true,
		// position: 'middle',
		duration: 1000,
	});

	function toggle() {
		// toast.closeAll();
		console.log("Color mode toggled.");
		toggleColorMode();
		// toast();
	}

	return (
		<Tooltip label={`${text} mode`} borderRadius="md" placement="top" fontSize="2xs" display="none">
			{/*<HStack px={1}>
         <FormControl display="flex" alignItems="center" gap={1}>
          <Switch
            id="mode-toggle"
            size="sm"
            colorScheme={colorScheme}
            defaultChecked
            onChange={toggle}
            position="relative"
          />
          <FormLabel
            htmlFor="mode-toggle"
            me={0}
            display="flex"
            m={0}
            ms={0}
            p={0}
          >
            <Icon
              as={SwitchIcon}
              display="inline"
              verticalAlign="text-bottom"
            />
            <VisuallyHidden>Toggle Color Mode</VisuallyHidden>
          </FormLabel>
        </FormControl> 
        </HStack>*/}

			<IconButton
				colorScheme={colorScheme}
				isRound
				size="sm"
				// isActive={colorMode === "light"}
				variant={variant}
				icon={<SwitchIcon />}
				aria-label={`Toggle ${text} mode`}
				{...props}
				onClick={toggle}
			/>
		</Tooltip>
	);
};
