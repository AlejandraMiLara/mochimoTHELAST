import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../useAuth";
import {
  getMyProfile,
  updateMyProfile,
  getMyPaymentData,
  updateMyPaymentData,
  type ProfileDetails,
  type PaymentDataPayload,
} from "../../services/profile.service";

interface UseProfileResult {
  userInfo: ReturnType<typeof useAuth>["user"];
  profile: ProfileDetails;
  paymentData: PaymentDataPayload | null;
  loadingProfile: boolean;
  loadingPayment: boolean;
  savingProfile: boolean;
  savingPayment: boolean;
  error: string | null;
  refreshProfile: () => Promise<void>;
  refreshPayment: () => Promise<void>;
  saveProfile: (data: ProfileDetails) => Promise<void>;
  savePaymentData: (data: PaymentDataPayload) => Promise<void>;
}

const emptyProfile: ProfileDetails = {
  bio: "",
  avatarUrl: "",
};

export function useProfile(): UseProfileResult {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileDetails>(emptyProfile);
  const [paymentData, setPaymentData] = useState<PaymentDataPayload | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingPayment, setLoadingPayment] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPayment, setSavingPayment] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshProfile = useCallback(async () => {
    setLoadingProfile(true);
    setError(null);
    try {
      const userData = await getMyProfile();
      setProfile({
        bio: (userData as any).bio ?? "",
        avatarUrl: (userData as any).avatarUrl ?? "",
      });
    } catch (err: any) {
      setProfile(emptyProfile);
      setError(err?.message ?? "No se pudo cargar el perfil");
    } finally {
      setLoadingProfile(false);
    }
  }, []);

  const refreshPayment = useCallback(async () => {
    if (user?.role !== "FREELANCER") {
      setPaymentData(null);
      setLoadingPayment(false);
      return;
    }

    setLoadingPayment(true);
    try {
      const data = await getMyPaymentData();
      setPaymentData(data);
    } catch (err: any) {
      if (err?.response?.status === 404) {
        setPaymentData(null);
      } else {
        setError(err?.message ?? "No se pudo cargar los datos de pago");
      }
    } finally {
      setLoadingPayment(false);
    }
  }, [user?.role]);

  useEffect(() => {
    refreshProfile();
    refreshPayment();
  }, [refreshProfile, refreshPayment]);

  const saveProfile = useCallback(
    async (data: ProfileDetails) => {
      setSavingProfile(true);
      setError(null);
      try {
        await updateMyProfile(data);
        setProfile((prev) => ({
          bio:
            data.bio !== undefined
              ? data.bio ?? ""
              : prev.bio,
          avatarUrl:
            data.avatarUrl !== undefined
              ? data.avatarUrl ?? ""
              : prev.avatarUrl,
        }));
      } catch (err: any) {
        setError(err?.message ?? "No se pudo guardar el perfil");
        throw err;
      } finally {
        setSavingProfile(false);
      }
    },
    []
  );

  const savePaymentData = useCallback(
    async (data: PaymentDataPayload) => {
      setSavingPayment(true);
      setError(null);
      try {
        const updated = await updateMyPaymentData(data);
        setPaymentData(updated);
      } catch (err: any) {
        setError(err?.message ?? "No se pudo guardar los datos de pago");
        throw err;
      } finally {
        setSavingPayment(false);
      }
    },
    []
  );

  return {
    userInfo: user,
    profile,
    paymentData,
    loadingProfile,
    loadingPayment,
    savingProfile,
    savingPayment,
    error,
    refreshProfile,
    refreshPayment,
    saveProfile,
    savePaymentData,
  };
}
