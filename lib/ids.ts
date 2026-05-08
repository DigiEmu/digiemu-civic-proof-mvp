export function currentYear(): number {
  return new Date().getFullYear();
}

export function randomNumber(length = 5): string {
  const max = 10 ** length;
  return Math.floor(Math.random() * max)
    .toString()
    .padStart(length, "0");
}

export function createProjectId(): string {
  return `PRJ-${currentYear()}-0001`;
}

export function createEventId(): string {
  return `EVT-${Date.now()}`;
}

export function createDecisionId(): string {
  return `DEC-${Date.now()}`;
}

export function createBelegnummer(): string {
  return `BEL-${currentYear()}-${randomNumber(5)}`;
}