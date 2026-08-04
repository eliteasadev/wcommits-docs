/**
 * @file types.ts
 * @module domain/commit-engine
 * @description Type definitions and domain contracts for the Conventional Commits engine.
 * 
 * Architecture Note:
 * This file contains pure domain types with zero external or UI dependencies.
 * It establishes strict type safety across the application, preventing primitive obsession
 * and stringly-typed commit parameters.
 */

/**
 * Standard Conventional Commit types recognized by wcommits.
 */
export type CommitType =
  | 'feat'
  | 'fix'
  | 'docs'
  | 'style'
  | 'refactor'
  | 'perf'
  | 'test'
  | 'build'
  | 'ci'
  | 'chore'
  | 'revert';

/**
 * Array of valid commit types for runtime validation and UI iteration.
 */
export const COMMIT_TYPES: readonly CommitType[] = [
  'feat',
  'fix',
  'docs',
  'style',
  'refactor',
  'perf',
  'test',
  'build',
  'ci',
  'chore',
  'revert',
] as const;

/**
 * Input options required to compose a Conventional Commit message.
 */
export interface CommitOptions {
  /** The type of intent for the change (e.g., feat, fix, docs). */
  type: CommitType;
  /** Optional contextual module or scope (e.g., auth, api, parser). */
  scope?: string;
  /** Whether this commit introduces breaking changes. */
  isBreaking?: boolean;
  /** Concise summary of changes written in the imperative mood. */
  description: string;
  /** Extended details, rationale, or breaking change details. */
  body?: string;
}

/**
 * Validation output indicating if commit options satisfy domain rules.
 */
export interface ValidationResult {
  /** True if all domain validation rules pass. */
  isValid: boolean;
  /** Array of human-readable error messages if validation fails. */
  errors: string[];
}

/**
 * Structure containing formatted commit outputs for various execution targets.
 */
export interface FormattedCommitResult {
  /** Short single-line header formatted according to Conventional Commits specification. */
  header: string;
  /** Full formatted message including extended body if present. */
  fullMessage: string;
  /** Formatted CLI command for wcommits execution. */
  cliCommand: string;
  /** Formatted direct Git commit command. */
  gitCommand: string;
  /** Result of domain rule validation. */
  validation: ValidationResult;
}
