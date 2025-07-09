"use client";

import React, { useState, useEffect, ReactNode } from "react";
import { useForm, FieldErrors, UseFormRegister } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Eye,
  EyeOff,
  Save,
  Loader2,
  User,
  Mail,
  Hash,
  Lock,
} from "lucide-react";
import { Toaster, toast } from "react-hot-toast";

// ============================================================================
//   SHARED VALIDATION & TYPES
// ============================================================================
const accountSchema = z
  .object({
    username: z.string().min(4, "Username must be at least 4 characters."),
    email: z.string().email("Please enter a valid email address."),
    regNo: z
      .string()
      .min(6, "Registration number must be at least 6 characters."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .optional()
      .or(z.literal("")),
    confirmPassword: z.string().optional().or(z.literal("")),
  })
  .refine(
    (data) => {
      if (data.password) return data.password === data.confirmPassword;
      return true;
    },
    { message: "Passwords do not match.", path: ["confirmPassword"] }
  );

type AccountFormData = z.infer<typeof accountSchema>;

// ============================================================================
//   1. REUSABLE UI COMPONENTS
// ============================================================================
interface SettingsCardProps {
  title: string;
  description: string;
  children: ReactNode;
}

const SettingsCard: React.FC<SettingsCardProps> = ({
  title,
  description,
  children,
}) => (
  <div className="bg-white rounded-xl shadow-sm">
    <div className="p-6 border-b border-slate-200">
      <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
    </div>
    <div className="p-6 space-y-6">{children}</div>
  </div>
);

interface IconInputProps {
  id: keyof AccountFormData;
  label: string;
  type?: string;
  placeholder: string;
  icon: React.ElementType;
  register: UseFormRegister<AccountFormData>;
  error: FieldErrors<AccountFormData>[keyof AccountFormData];
}

const IconInput: React.FC<IconInputProps> = ({
  id,
  label,
  type = "text",
  placeholder,
  icon: Icon,
  register,
  error,
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-slate-700 mb-1.5"
    >
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="w-5 h-5 text-slate-400" />
      </div>
      <input
        id={id}
        type={type}
        {...register(id)}
        placeholder={placeholder}
        className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
      />
    </div>
    {error && (
      <p className="text-red-500 text-xs mt-1.5">{error.message as string}</p>
    )}
  </div>
);

interface PasswordInputProps {
  id: "password" | "confirmPassword";
  label: string;
  register: UseFormRegister<AccountFormData>;
  error: FieldErrors<AccountFormData>[keyof AccountFormData];
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  label,
  register,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-slate-700 mb-1.5"
      >
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Lock className="w-5 h-5 text-slate-400" />
        </div>
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          {...register(id)}
          placeholder="••••••••"
          className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-blue-600"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1.5">{error.message as string}</p>
      )}
    </div>
  );
};

// ============================================================================
//   2. MAIN ACCOUNT SETTINGS CONTENT
// ============================================================================
const ModernAdminSettingsContent = () => {
  const [isDataLoading, setIsDataLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AccountFormData>({
    resolver: zodResolver(accountSchema),
  });

  useEffect(() => {
    const fetchAdminData = async () => {
      const mockAdminData = {
        username: "admin_01",
        email: "admin@example.com",
        regNo: "STF11223",
      };
      await new Promise((resolve) => setTimeout(resolve, 1200));
      reset({ ...mockAdminData, password: "", confirmPassword: "" });
      setIsDataLoading(false);
    };
    fetchAdminData();
  }, [reset]);

  const onSubmit = async (data: AccountFormData) => {
    const updateData: Partial<AccountFormData> = {
      username: data.username,
      email: data.email,
      regNo: data.regNo,
    };
    if (data.password) updateData.password = data.password;
    try {
      console.log("Submitting to backend:", updateData);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Profile updated successfully!");
      reset({ ...data, password: "", confirmPassword: "" });
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  if (isDataLoading) {
    return (
      <div className="flex justify-center items-center h-full w-full p-10">
        <div className="flex flex-col items-center">
          <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
          <p className="mt-4 text-lg text-slate-600">Loading Your Settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 w-full max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Account Settings</h1>
        <p className="mt-1 text-slate-500">
          Manage your profile, and password settings.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <SettingsCard
          title="Profile Information"
          description="Update your personal details here."
        >
          <IconInput
            id="username"
            label="Username"
            placeholder="e.g., admin_01"
            icon={User}
            register={register}
            error={errors.username}
          />
          <IconInput
            id="email"
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            icon={Mail}
            register={register}
            error={errors.email}
          />
          <IconInput
            id="regNo"
            label="Registration Number"
            placeholder="e.g., STF11223"
            icon={Hash}
            register={register}
            error={errors.regNo}
          />
        </SettingsCard>

        <SettingsCard
          title="Security"
          description="Leave fields blank to keep your current password."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PasswordInput
              id="password"
              label="New Password"
              register={register}
              error={errors.password}
            />
            <PasswordInput
              id="confirmPassword"
              label="Confirm New Password"
              register={register}
              error={errors.confirmPassword}
            />
          </div>
        </SettingsCard>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-5 w-5" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

// ============================================================================
//   3. FINAL EXPORT WITH A VISIBLE, SCROLLABLE WRAPPER
// ============================================================================
export default function VisibleScrollableSettingsPage() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: { borderRadius: "8px", background: "#333", color: "#fff" },
        }}
      />
      <div className="w-full h-[700px] overflow-y-auto bg-slate-50 border-2 border-dashed border-red-400 rounded-lg">
        <ModernAdminSettingsContent />
      </div>
    </>
  );
}
