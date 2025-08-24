import { useState, useRef } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { defaultArticleState, fontFamilyOptions, fontColors, backgroundColors, fontSizeOptions, contentWidthArr } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = ({ onApply }: { onApply: (settings: any) => void }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const panelRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: isMenuOpen,
		onChange: setIsMenuOpen,
		rootRef: panelRef
	});

	const togglePanel = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const [formState, setFormState] = useState(defaultArticleState);

	const handleFieldChange = (fieldName: keyof typeof defaultArticleState, option: any) => {
		setFormState({ ...formState, [fieldName]: option });
	};

	const handleApply = () => {
		onApply(formState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={togglePanel} />

			<div className={clsx(styles.container, { [styles.container_open]: isMenuOpen })} ref={panelRef}>
				<form className={styles.form} onSubmit={(e) => { e.preventDefault(); handleApply(); }}>
					<h2 className={styles.title}>ЗАДАЙТЕ ПАРАМЕТРЫ</h2>

					<div className={styles.field}>
						<Select
							title="Шрифт"
							placeholder="Выберите шрифт"
							selected={formState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={(option) => handleFieldChange('fontFamilyOption', option)}
						/>
					</div>

					<div className={styles.field}>
						<RadioGroup
							name="fontSize"
							title="Размер шрифта"
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={(option) => handleFieldChange('fontSizeOption', option)}
						/>
					</div>

					<div className={styles.field}>
						<Select
							title="Цвет шрифта"
							placeholder="Выберите цвет"
							selected={formState.fontColor}
							options={fontColors}
							onChange={(option) => handleFieldChange('fontColor', option)}
						/>
					</div>

					<Separator />

					<div className={styles.field}>
						<Select
							title="Цвет фона"
							placeholder="Выберите цвет фона"
							selected={formState.backgroundColor}
							options={backgroundColors}
							onChange={(option) => handleFieldChange('backgroundColor', option)}
						/>
					</div>

					<div className={styles.field}>
						<Select
							title="Ширина контента"
							placeholder="Выберите ширину"
							selected={formState.contentWidth}
							options={contentWidthArr}
							onChange={(option) => handleFieldChange('contentWidth', option)}
						/>
					</div>

					<div className={styles.bottomContainer}>
					    <Button title='Сбросить' htmlType='button' type='clear' onClick={handleReset} />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</div>
		</>
	);
};