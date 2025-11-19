import { useState } from 'react';
import { contractService } from '../services/contract.service';
import type { Contract, CreateContractDto, ReviewContractDto } from '../services/contract.service';

export const useContracts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createContract = async (data: CreateContractDto): Promise<Contract> => {
    setLoading(true);
    setError(null);
    try {
      const contract = await contractService.createContract(data);
      return contract;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Error al crear contrato';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const submitContract = async (contractId: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await contractService.submitContract(contractId);
    } catch (err: any) {
      const message = err.response?.data?.message || 'Error al enviar contrato';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const getContractForProject = async (projectId: string): Promise<Contract | null> => {
    setLoading(true);
    setError(null);
    try {
      const contract = await contractService.getContractForProject(projectId);
      return contract;
    } catch (err: any) {
      if (err.response?.status === 404) {
        return null;
      }
      const message = err.response?.data?.message || 'Error al cargar contrato';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const reviewContract = async (contractId: string, data: ReviewContractDto): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await contractService.reviewContract(contractId, data);
    } catch (err: any) {
      const message = err.response?.data?.message || 'Error al revisar contrato';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createContract,
    submitContract,
    getContractForProject,
    reviewContract
  };
};
