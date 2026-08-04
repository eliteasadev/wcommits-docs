/**
 * @file index.ts
 * @module domain/commit-engine
 * @description Public exports for the domain commit engine module.
 * 
 * Architecture Note:
 * Barrel file exporting types and the core CommitEngine domain class.
 * Components and services should import directly from this barrel module.
 */

export * from './types';
export * from './CommitEngine';
