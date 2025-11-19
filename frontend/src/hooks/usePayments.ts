import { useState } from 'react';
import { paymentService } from '../services/payment.service';
import type { PaymentProof, ReviewProofDto } from '../services/payment.service';

export const usePayments = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadProof = async (projectId: string, file: File): Promise<PaymentProof> => {
    setLoading(true);
    setError(null);
    try {
      const proof = await paymentService.uploadProof(projectId, file);
      return proof;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Error al subir comprobante';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const getProofsForProject = async (projectId: string): Promise<PaymentProof[]> => {
    setLoading(true);
    setError(null);
    try {
      const proofs = await paymentService.getProofsForProject(projectId);
      return proofs;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Error al cargar comprobantes';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const reviewProof = async (proofId: string, data: ReviewProofDto): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await paymentService.reviewProof(proofId, data);
    } catch (err: any) {
      const message = err.response?.data?.message || 'Error al revisar comprobante';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    uploadProof,
    getProofsForProject,
    reviewProof
  };
};
