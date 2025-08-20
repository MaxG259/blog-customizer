import { Separator } from 'src/ui/separator';
import { defaultArticleState, ArticleStateType } from 'src/constants/articleProps';
import { backgroundColors } from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { contentWidthArr } from 'src/constants/articleProps';
import { Select } from 'src/ui/select';
import { fontColors } from 'src/constants/articleProps';
import { fontFamilyOptions, fontSizeOptions } from 'src/constants/articleProps';
import { useState } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = ({ onApply }: { onApply: (settings: ArticleStateType) => void }) => {
	const [isOpen, setIsOpen] = useState(false);
	/*
	isOpen - переменная
	setIsOpen - функция
	false - начальное значение
	*/

	const togglePanel = () => {
		setIsOpen(!isOpen);
	}; // При каждом вызове меняет isOpen на противоположное значение

	const [formState, setFormState] = useState(defaultArticleState);

	const handleApply = () => {
		onApply(formState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);  // Сбрасываем форму к начальным значениям
		onApply(defaultArticleState);       // Применяем начальные значения к статье
	};

	const handleFieldChange = (fieldName: keyof ArticleStateType, option: ArticleStateType[keyof ArticleStateType]) => {
		setFormState({ ...formState, [fieldName]: option });
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={togglePanel} />
			{}
				<aside className={clsx(styles.container, { [styles.container_open]: isOpen })}>
					<form className={styles.form}>
						<h2 className={styles.title}>ЗАДАЙТЕ ПАРАМЕТРЫ</h2>

                        <div>
							<Select
								title='Шрифт'
								placeholder='Выберите шрифт'
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
								title='Цвет шрифта'
								placeholder='Выберите цвет'
								selected={formState.fontColor}
								options={fontColors}
								onChange={(option) => handleFieldChange('fontColor', option)}
							/>
						</div>

						{}
						<div>
							<Separator />
						</div>

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
							<Button title='Применить' htmlType='button' type='apply' onClick={handleApply} />
						</div>
					</form>
				</aside>
		</>
	);
};