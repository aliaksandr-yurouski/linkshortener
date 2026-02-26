---
description: Read this file for instructions on how to fetch data in the project.
---
# Data Fetching Instructions

This document provides guidelines for fetching data in the Link Shortener project. Follow these instructions to ensure consistency and maintainability across the codebase.

## 1. Use Server Components for Data Fetching

ALWAYS fetch data in Server Components. NEVER fetch data in Client Components.

## 2. Data fetching methods

ALWAYS use the helper functions in the /data directory for data fetching. NEVER call Drizzle ORM methods directly in your components.

ALL helper functions in the /data directory should use the Drizzle ORM for database interactions.