/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum UserRole {
  ADMIN = 'admin',
  GURU = 'guru',
  SISWA = 'siswa',
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  nis?: string;
  class?: string;
}

export interface Question {
  id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: string;
  created_at: string;
  created_by: string;
}

export interface Exam {
  id: string;
  title: string;
  duration: number;
  created_at: string;
  created_by: string;
  questions?: Question[];
}

export interface Result {
  id: string;
  user_id: string;
  exam_id: string;
  score: number;
  completed_at: string;
  user?: {
    name: string;
    class?: string;
  };
  exam?: {
    title: string;
  };
}
