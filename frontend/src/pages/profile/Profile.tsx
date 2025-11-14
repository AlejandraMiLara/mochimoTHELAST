// src/pages/profile/Profile.tsx
"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashBoardLayout";
import { useProfile } from "../../hooks/profile/useProfile";

export default function Profile() {
  const {
    userInfo,
    profile,
    paymentData,
    loadingProfile,
    loadingPayment,
    savingProfile,
    savingPayment,
    error,
    saveProfile,
    savePaymentData,
  } = useProfile();

  const [profileForm, setProfileForm] = useState(profile);
  const [profileMessage, setProfileMessage] = useState<string | null>(null);
  const [paymentForm, setPaymentForm] = useState(
    paymentData ?? {
      bankName: "",
      accountHolder: "",
      accountNumber: "",
    }
  );
  const [paymentMessage, setPaymentMessage] = useState<string | null>(null);

  useEffect(() => {
    setProfileForm({
      bio: profile.bio ?? "",
      avatarUrl: profile.avatarUrl ?? "",
    });
  }, [profile]);

  useEffect(() => {
    setPaymentForm(
      paymentData ?? {
        bankName: "",
        accountHolder: "",
        accountNumber: "",
      }
    );
  }, [paymentData]);

  if (!userInfo) {
    return (
      <DashboardLayout>
        <div className="p-8 text-white">Cargando perfil...</div>
      </DashboardLayout>
    );
  }

  const isFreelancer = userInfo.role === "FREELANCER";

  const submitProfile = async (event: React.FormEvent) => {
    event.preventDefault();
    setProfileMessage(null);
    try {
      const payload: { bio?: string | null; avatarUrl?: string | null } = {};
      const bioTrimmed = profileForm.bio?.trim();
      const avatarTrimmed = profileForm.avatarUrl?.trim();

      if (bioTrimmed !== undefined) {
        payload.bio = bioTrimmed;
      }
      payload.avatarUrl = avatarTrimmed ? avatarTrimmed : null;
      await saveProfile(payload);
      setProfileMessage("Perfil actualizado correctamente");
    } catch {
      /* already handled */
    }
  };

  const submitPayment = async (event: React.FormEvent) => {
    event.preventDefault();
    setPaymentMessage(null);
    try {
      await savePaymentData(paymentForm);
      setPaymentMessage("Datos de pago guardados");
    } catch {
      /* already handled */
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold text-gray-900">Mi Perfil</h1>
          <p className="text-sm text-gray-500 mt-2">
            Gestiona tu información personal y tus datos de pago.
          </p>
        </header>

        {error && (
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        )}

        <section className="bg-base-200 rounded-lg shadow p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-base-300 flex items-center justify-center overflow-hidden">
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl text-white">
                  {userInfo.email.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">{userInfo.email}</h2>
              <p className="text-sm text-base-content/70">Rol: {userInfo.role}</p>
            </div>
          </div>

          <form onSubmit={submitProfile} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1">Bio</label>
              <textarea
                className="textarea textarea-bordered w-full bg-gray-900/40 text-white"
                rows={4}
                placeholder="Cuéntanos sobre tu experiencia"
                value={profileForm.bio ?? ""}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, bio: e.target.value })
                }
                disabled={loadingProfile}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Avatar URL
              </label>
              <input
                type="url"
                className="input input-bordered w-full bg-gray-900/40 text-white"
                placeholder="https://miportafolio.com/avatar.jpg"
                value={profileForm.avatarUrl ?? ""}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, avatarUrl: e.target.value })
                }
                disabled={loadingProfile}
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="btn bg-cyan-400 border-cyan-400 text-white"
                disabled={savingProfile}
              >
                {savingProfile ? "Guardando..." : "Guardar perfil"}
              </button>
              {profileMessage && (
                <span className="text-sm text-green-300">{profileMessage}</span>
              )}
            </div>
          </form>
        </section>

        {isFreelancer && (
          <section className="bg-base-200 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Datos de pago</h2>
            <form onSubmit={submitPayment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Banco
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full bg-gray-900/40 text-white"
                  value={paymentForm.bankName}
                  onChange={(e) =>
                    setPaymentForm({ ...paymentForm, bankName: e.target.value })
                  }
                  disabled={loadingPayment}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Titular de la cuenta
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full bg-gray-900/40 text-white"
                  value={paymentForm.accountHolder}
                  onChange={(e) =>
                    setPaymentForm({
                      ...paymentForm,
                      accountHolder: e.target.value,
                    })
                  }
                  disabled={loadingPayment}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Número de cuenta / CLABE
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full bg-gray-900/40 text-white"
                  value={paymentForm.accountNumber}
                  onChange={(e) =>
                    setPaymentForm({
                      ...paymentForm,
                      accountNumber: e.target.value,
                    })
                  }
                  disabled={loadingPayment}
                />
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  className="btn bg-cyan-400 border-cyan-400 text-white"
                  disabled={savingPayment}
                >
                  {savingPayment ? "Guardando..." : "Guardar datos de pago"}
                </button>
                {paymentMessage && (
                  <span className="text-sm text-green-300">{paymentMessage}</span>
                )}
              </div>
            </form>
          </section>
        )}
      </div>
    </DashboardLayout>
  );
}
