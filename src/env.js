import { z } from "zod/v4";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  SECRET_KEY: z.string(),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string(),
  IDOSELL_API_KEY: z.string().default("none"),
  IDOSELL_PANEL_LINK: z.string().default("none")
});

try {
  // eslint-disable-next-line node/no-process-env
  envSchema.parse(process.env);
}
catch (error) {
  if (error instanceof z.ZodError) {
    console.error("Missing environment variables:", error.issues.flatMap(issue => issue.path));
  }
  else {
    console.error(error);
  }
  process.exit(1);
}

// eslint-disable-next-line node/no-process-env
export const env = envSchema.parse(process.env);
