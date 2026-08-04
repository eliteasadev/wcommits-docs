/**
 * @file CommitEngine.ts
 * @module domain/commit-engine
 * @description Domain entity and engine responsible for validating, formatting, and constructing Conventional Commit messages, CLI flags, and Git execution commands.
 * 
 * Architecture & Scalability Note:
 * This domain engine isolates all core business rules of Conventional Commits from UI presentation components.
 * By keeping this module pure (no DOM, no framework imports), it achieves high cohesion and low coupling.
 * It is easily testable in isolation, highly maintainable, and reusable across web components, server endpoints, or CLI tools.
 */

import type {
  CommitOptions,
  CommitType,
  FormattedCommitResult,
  ValidationResult,
} from './types';
import { COMMIT_TYPES } from './types';

/**
 * Domain engine class for constructing, validating, and formatting commit messages.
 */
export class CommitEngine {
  private readonly options: Readonly<CommitOptions>;

  /**
   * Creates an instance of CommitEngine with sanitized input options.
   * 
   * @param options Configuration parameters for generating commit messages and commands.
   */
  constructor(options: CommitOptions) {
    this.options = {
      type: options.type,
      scope: options.scope?.trim() || undefined,
      isBreaking: Boolean(options.isBreaking),
      description: options.description?.trim() || '',
      body: options.body?.trim() || undefined,
    };
  }

  /**
   * Retrieves the sanitized commit options.
   * 
   * @returns Readonly CommitOptions object.
   */
  public getOptions(): Readonly<CommitOptions> {
    return this.options;
  }

  /**
   * Validates the instance's commit options against domain business rules.
   * 
   * Validation Rules:
   * 1. Commit type must be a valid Conventional Commit type.
   * 2. Description must not be empty.
   * 3. Description should not end with a period (Conventional Commits best practice).
   * 
   * @returns ValidationResult containing validation state and array of error messages.
   */
  public validate(): ValidationResult {
    return CommitEngine.validateOptions(this.options);
  }

  /**
   * Static utility method to validate any arbitrary commit options.
   * 
   * @param options Partial or full commit options to evaluate.
   * @returns ValidationResult with validation boolean and error messages.
   */
  public static validateOptions(options: Partial<CommitOptions>): ValidationResult {
    const errors: string[] = [];

    if (!options.type || !COMMIT_TYPES.includes(options.type as CommitType)) {
      errors.push(`Invalid commit type: "${options.type}". Must be one of: ${COMMIT_TYPES.join(', ')}.`);
    }

    if (!options.description || options.description.trim().length === 0) {
      errors.push('Commit description is required and cannot be empty.');
    } else if (options.description.trim().endsWith('.')) {
      errors.push('Commit description should not end with a period.');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Formats the short single-line Conventional Commit header string.
   * 
   * Format: `<type>(<scope>)!: <description>`
   * Example: `feat(auth)!: add JWT token validation`
   * 
   * @returns Formatted commit header string.
   */
  public formatHeader(): string {
    const scopePart = this.options.scope ? `(${this.options.scope})` : '';
    const breakPart = this.options.isBreaking ? '!' : '';
    const descPart = this.options.description || 'your description';
    return `${this.options.type}${scopePart}${breakPart}: ${descPart}`;
  }

  /**
   * Formats the full Conventional Commit message specification.
   * If an extended body is provided, appends it separated by two newlines.
   * 
   * Example:
   * ```
   * feat(auth)!: add JWT token validation
   * 
   * Implements RSA256 signature verification for authorization headers.
   * ```
   * 
   * @returns Full formatted commit message specification string.
   */
  public formatSpec(): string {
    const header = this.formatHeader();
    if (this.options.body) {
      return `${header}\n\n${this.options.body}`;
    }
    return header;
  }

  /**
   * Formats the corresponding wcommits CLI command.
   * 
   * Example: `npx wcommits -t feat -s auth -b -m "add JWT token validation" --body "..."`
   * 
   * @returns Formatted CLI execution command string.
   */
  public formatCliCommand(): string {
    const typeFlag = `-t ${this.options.type}`;
    const scopeFlag = this.options.scope ? ` -s ${CommitEngine.escapeShell(this.options.scope)}` : '';
    const breakFlag = this.options.isBreaking ? ' -b' : '';
    const msg = this.options.description || 'your description';
    const msgFlag = ` -m "${CommitEngine.escapeShell(msg)}"`;
    const bodyFlag = this.options.body ? ` --body "${CommitEngine.escapeShell(this.options.body)}"` : '';

    return `npx wcommits ${typeFlag}${scopeFlag}${breakFlag}${msgFlag}${bodyFlag}`;
  }

  /**
   * Formats the direct `git commit` command execution string with single or multiple `-m` flags.
   * 
   * Example: `git commit -m "feat(auth): add JWT token validation" -m "extended details"`
   * 
   * @returns Formatted Git command string.
   */
  public formatGitCommand(): string {
    const header = this.formatHeader();
    const gitHeaderFlag = `git commit -m "${CommitEngine.escapeShell(header)}"`;
    const gitBodyFlag = this.options.body ? ` -m "${CommitEngine.escapeShell(this.options.body)}"` : '';
    return `${gitHeaderFlag}${gitBodyFlag}`;
  }

  /**
   * Compiles and builds all formatted outputs into a single FormattedCommitResult object.
   * 
   * @returns FormattedCommitResult containing header, fullMessage, cliCommand, gitCommand, and validation.
   */
  public build(): FormattedCommitResult {
    return {
      header: this.formatHeader(),
      fullMessage: this.formatSpec(),
      cliCommand: this.formatCliCommand(),
      gitCommand: this.formatGitCommand(),
      validation: this.validate(),
    };
  }

  /**
   * Escapes double quotes within string inputs to prevent shell command injection / syntax errors.
   * 
   * @param str Raw input string.
   * @returns Shell-safe string with escaped quotes.
   */
  private static escapeShell(str: string): string {
    return str.replace(/"/g, '\\"');
  }
}
