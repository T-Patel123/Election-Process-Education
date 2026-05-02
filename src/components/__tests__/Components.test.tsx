import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Hero from '../Hero';
import VoterRegistration from '../VoterRegistration';

// Mock components that use external libraries or complex logic
vi.mock('../AIChat', () => ({ default: () => <div data-testid="ai-chat-mock">AIChat</div> }));
vi.mock('../ElectionJourney', () => ({ default: () => <div data-testid="election-journey-mock">ElectionJourney</div> }));
vi.mock('../Quiz', () => ({ default: () => <div data-testid="quiz-mock">Quiz</div> }));
vi.mock('../Infographics', () => ({ default: () => <div data-testid="infographics-mock">Infographics</div> }));

describe('App Components', () => {
  describe('Hero', () => {
    it('renders hero content correctly', () => {
      render(<Hero />);
      expect(screen.getByText(/Understand/i)).toBeInTheDocument();
      expect(screen.getByText(/Elections/i)).toBeInTheDocument();
      expect(screen.getByText(/Minutes/i)).toBeInTheDocument();
    });

    it('handles AI Assistant click', () => {
      const dispatchEventSpy = vi.spyOn(window, 'dispatchEvent');
      render(<Hero />);
      
      const aiButton = screen.getByText(/Ask AI Assistant/i);
      fireEvent.click(aiButton);
      
      expect(dispatchEventSpy).toHaveBeenCalledWith(expect.any(CustomEvent));
      expect(dispatchEventSpy.mock.calls[0][0].type).toBe('open-ai-chat');
      
      dispatchEventSpy.mockRestore();
    });
  });

  describe('VoterRegistration', () => {
    it('renders registration steps', () => {
      render(<VoterRegistration />);
      expect(screen.getByText(/FIRST TIME VOTER\?/i)).toBeInTheDocument();
      expect(screen.getByText(/5 Simple Steps/i)).toBeInTheDocument();
      
      // Check for steps
      expect(screen.getByText(/Visit Official Portal/i)).toBeInTheDocument();
      expect(screen.getByText(/Select Form 6/i)).toBeInTheDocument();
      expect(screen.getByText(/Fill Details/i)).toBeInTheDocument();
      expect(screen.getByText(/Upload Documents/i)).toBeInTheDocument();
      expect(screen.getByText(/Submit & Track/i)).toBeInTheDocument();
    });
  });
});
