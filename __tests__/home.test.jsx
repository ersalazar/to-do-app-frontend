
import Home from '../src/app/page';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom'; 
import { describe } from 'node:test';
import axios from 'axios';


jest.mock('axios');

describe('Home', () => {
    it('renders properly', () => {
      render(<Home />);
        expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();
  
      expect(screen.getByRole('button', { name: /New To Do/i })).toBeInTheDocument();
  
      expect(screen.getByRole('table')).toBeInTheDocument();
  
      expect(screen.getByText(/Page/i)).toBeInTheDocument();
  
      expect(screen.getByText(/Avarage time to finish tasks:/i)).toBeInTheDocument();
    });

    it('shows the modal when the "New To Do" button is clicked', () => {
        const mockOnClick = jest.fn();
        render(<Home onNewToDoClick={mockOnClick} />);
        const newToDoButton = screen.getByRole('button', { name: /New To Do/i });
        fireEvent.click(newToDoButton);
        //in home is "New To do but in the modal is "New To Do" (with capital D)
        expect(screen.getByText(/New To Do/i)).toBeInTheDocument();

      });

      it('navigates pagination correctly', async () => {
        axios.get.mockResolvedValue({
          data: {
            items: [],
            totalPages: 10,
            totalItems: 100,
            currentPage: 0,
            avgTimeToFinishTasks: 0,
            avgTimeToFinishTasksPriorityLow: 0,
            avgTimeToFinishTaskspriorityHigh: 0,
            avgTimeToFinishTaskspriorityMedium: 0
          }
        });
      
        render(<Home />);
        
        const firstPageButton = screen.getByRole('button', { name: /navToFirst/i });
        const prevPageButton = screen.getByRole('button', { name: /navToPrev/i });
        const nextPageButton = screen.getByRole('button', { name: /navToNext/i });
        const lastPageButton = screen.getByRole('button', { name: /navToLast/i });
      
        fireEvent.click(nextPageButton);
        await waitFor(() => {
          expect(axios.get).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({
            params: expect.objectContaining({ page: 0 })
          }));
        });

        fireEvent.click(lastPageButton);
        await waitFor(() => {
          expect(axios.get).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({
            params: expect.objectContaining({ page})
          }));
        });

        fireEvent.click(prevPageButton);
        await waitFor(() => {
          expect(axios.get).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({
            params: expect.objectContaining({ page: 8 })
          }));
        });

        fireEvent.click(firstPageButton);
        await waitFor(() => {
          expect(axios.get).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({
            params: expect.objectContaining({ page: 0 })
          }));
        });
      
      });
      
  
  });