import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import clsx from 'clsx';
import { Select } from '../../ui/select/Select';
import {
	fontFamilyOptions,
	defaultArticleState,
	OptionType,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
} from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { useState, SyntheticEvent } from 'react';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from '../../ui/separator/Separator';
import { Text } from '../../ui/text/Text';

type ArticleStateTypeProps = {
	resetForm: () => void;
	submit: (obj: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleStateTypeProps) => {
	const { resetForm, submit } = props;
	const [isOpen, setIsOpen] = useState(false);
	const [selectedFontFamilyOptions, setSelectedFontFamilyOptions] =
		useState<OptionType>(defaultArticleState.fontFamilyOption);
	const [fontSize, setFontSize] = useState<OptionType>(
		defaultArticleState.fontSizeOption
	);
	const [fontColor, setFontColor] = useState<OptionType>(
		defaultArticleState.fontColor
	);
	const [backgroundColor, setBackgroundColor] = useState<OptionType>(
		defaultArticleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState<OptionType>(
		defaultArticleState.contentWidth
	);

	const changeFont = (selected: OptionType) => {
		setSelectedFontFamilyOptions(selected);
	};

	const OnClick = () => {
		setIsOpen(!isOpen);
		changeFont(selectedFontFamilyOptions);
		changeSize(fontSize);
		changeFontColor(fontColor);
		cgangeContentWidth(contentWidth);
		changeBackgroundColor(backgroundColor);
	};

	const changeSize = (value: OptionType) => {
		setFontSize(value);
	};

	const changeFontColor = (selected: OptionType) => {
		setFontColor(selected);
	};

	const changeBackgroundColor = (selected: OptionType) => {
		setBackgroundColor(selected);
	};

	const cgangeContentWidth = (selected: OptionType) => {
		setContentWidth(selected);
	};

	const handleSubmit = (event: SyntheticEvent) => {
		event.preventDefault();
		const articleState: ArticleStateType = {
			fontFamilyOption: selectedFontFamilyOptions,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
			fontSizeOption: fontSize,
		};
		submit(articleState);
	};

	const handleReset = () => {
		resetForm();
		changeFont(defaultArticleState.fontFamilyOption);
		changeSize(defaultArticleState.fontSizeOption);
		changeFontColor(defaultArticleState.fontColor);
		cgangeContentWidth(defaultArticleState.contentWidth);
		changeBackgroundColor(defaultArticleState.backgroundColor);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={OnClick} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form}>
					<Text as={'h2'} size={38} weight={800} uppercase={true}>
						задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={selectedFontFamilyOptions}
						title={'ШРИФТ'}
						onChange={changeFont}
					/>
					<RadioGroup
						options={fontSizeOptions}
						selected={fontSize}
						name={'radioName'}
						title={'РАЗМЕР ШРИФТА'}
						onChange={changeSize}
					/>
					<Select
						options={fontColors}
						selected={fontColor}
						title={'ЦВЕТ ШРИФТА'}
						onChange={changeFontColor}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={backgroundColor}
						title={'ЦВЕТ ФОНА'}
						onChange={changeBackgroundColor}
					/>
					<Select
						options={contentWidthArr}
						selected={contentWidth}
						title={'ШИРИНА КОНТЕНТА'}
						onChange={cgangeContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={handleSubmit}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
