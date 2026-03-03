export const responsiveWidth = (
  base: number,
  sm?: number,
  md?: number,
  lg?: number,
  xl?: number
): string => {
  const classes = [`w-${base}`];
  if (sm) classes.push(`sm:w-${sm}`);
  if (md) classes.push(`md:w-${md}`);
  if (lg) classes.push(`lg:w-${lg}`);
  if (xl) classes.push(`xl:w-${xl}`);
  return classes.join(' ');
};
