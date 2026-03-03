export const VALIDATION_RULES = {
  NAME: {
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  EMAIL: {
    required: true,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  },
  RESUME_LINK: {
    required: true,
    pattern: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
  },
  COVER_NOTE: {
    required: true,
    minLength: 10,
    maxLength: 1000,
  },
} as const;
