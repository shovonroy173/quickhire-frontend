export const responsiveHeight = (
  base: number,
  sm?: number,
  md?: number,
  lg?: number,
  xl?: number
): string => {
  const classes = [`h-${base}`];
  if (sm) classes.push(`sm:h-${sm}`);
  if (md) classes.push(`md:h-${md}`);
  if (lg) classes.push(`lg:h-${lg}`);
  if (xl) classes.push(`xl:h-${xl}`);
  return classes.join(' ');
};
