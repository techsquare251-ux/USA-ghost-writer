"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Edit3, LogOut, Plus, RefreshCcw, Save, Trash2, Upload, X } from "lucide-react";
import { Toast } from "@/components/common/Toast";
import { cn } from "@/lib/utils";
import {
  PORTFOLIO_CATEGORY_LABELS,
  PORTFOLIO_GENRES,
  type PortfolioBook,
  type PortfolioCategory,
} from "@/src/data/portfolio";

type AdminPayload = PortfolioBook & { sortOrder: number };
type ToastState = { id: number; message: string; variant: "success" | "error" };

const EMPTY_FORM: AdminPayload = {
  id: "",
  title: "",
  author: "",
  category: "published_book",
  genre: "Children's",
  coverImage: "",
  amazonUrl: "https://amazon.com",
  description: "",
  sortOrder: 0,
};

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

function getFriendlyError(body: unknown, fallback: string) {
  if (!body || typeof body !== "object") return fallback;
  const payload = body as { detail?: unknown; message?: unknown };

  if (Array.isArray(payload.detail)) {
    return payload.detail
      .map((entry) => {
        if (!entry || typeof entry !== "object") return "Unknown validation error";
        const error = entry as { loc?: string[]; msg?: string };
        return `${error.loc?.join(".") ?? "field"} - ${error.msg ?? "invalid value"}`;
      })
      .join("; ");
  }

  if (typeof payload.detail === "string") return payload.detail;
  if (typeof payload.message === "string") return payload.message;
  return fallback;
}

export function PortfolioManager() {
  const [items, setItems] = useState<AdminPayload[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState("");
  const [toast, setToast] = useState<ToastState | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedItem = useMemo(() => items.find((item) => item.id === selectedId) ?? null, [items, selectedId]);
  const isEditing = Boolean(selectedItem);

  const showToast = (message: string, variant: ToastState["variant"] = "success") => {
    setToast({ id: Date.now(), message, variant });
  };

  const loadItems = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/portfolio", { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Could not load portfolio items.");
      }
      const data = (await response.json()) as AdminPayload[];
      setItems(data);
    } catch (loadError) {
      showToast(loadError instanceof Error ? loadError.message : "Could not load portfolio items.", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadItems();
  }, [loadItems]);

  useEffect(() => {
    if (selectedItem) {
      setForm({
        ...selectedItem,
        description: selectedItem.description ?? "",
        sortOrder: selectedItem.sortOrder ?? 0,
      });
      setCoverImagePreview(selectedItem.coverImage);
      setCoverImageFile(null);
      setIsEditorOpen(true);
      return;
    }

    if (!selectedId) {
      setForm(EMPTY_FORM);
      setCoverImagePreview("");
      setCoverImageFile(null);
    }
  }, [selectedItem, selectedId]);

  const openCreateModal = () => {
    setSelectedId(null);
    setForm(EMPTY_FORM);
    setCoverImageFile(null);
    setCoverImagePreview("");
    setIsEditorOpen(true);
  };

  const openEditModal = (id: string) => {
    setSelectedId(id);
    setIsEditorOpen(true);
  };

  const closeEditor = () => {
    setIsEditorOpen(false);
    setSelectedId(null);
    setForm(EMPTY_FORM);
    setCoverImageFile(null);
    setCoverImagePreview("");
  };

  const updateField = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleCoverImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      showToast("Only JPG, JPEG, PNG, and WebP images are accepted.", "error");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      showToast("File size must be less than 5MB.", "error");
      return;
    }

    setCoverImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setCoverImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const submit = async () => {
    setSaving(true);

    try {
      const method = isEditing ? "PUT" : "POST";
      const endpoint = isEditing ? `/api/admin/portfolio/${selectedItem?.id}` : "/api/admin/portfolio";

      if (!form.id || !form.title || !form.author || !form.amazonUrl) {
        throw new Error("Please fill in all required fields.");
      }

      if (!isEditing && !coverImageFile) {
        throw new Error("Cover image is required for new portfolio items.");
      }

      let response: Response;

      if (coverImageFile) {
        const formData = new FormData();
        formData.append("id", form.id);
        formData.append("title", form.title);
        formData.append("author", form.author);
        formData.append("category", form.category);
        formData.append("genre", form.genre);
        formData.append("cover_image", coverImageFile);
        formData.append("amazon_url", form.amazonUrl);
        if (form.description) {
          formData.append("description", form.description);
        }
        formData.append("sort_order", form.sortOrder.toString());

        response = await fetch(endpoint, {
          method,
          body: formData,
        });
      } else {
        const payload = {
          id: form.id,
          title: form.title,
          author: form.author,
          category: form.category,
          genre: form.genre,
          cover_image: form.coverImage,
          amazon_url: form.amazonUrl,
          description: form.description || null,
          sort_order: form.sortOrder,
        };

        response = await fetch(endpoint, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(getFriendlyError(body, `HTTP ${response.status}: ${response.statusText}`));
      }

      await loadItems();
      closeEditor();
      showToast(isEditing ? "Portfolio item updated successfully." : "Portfolio item created successfully.", "success");
    } catch (saveError) {
      const message = saveError instanceof Error ? saveError.message : "Could not save portfolio item.";
      showToast(message, "error");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!window.confirm("Delete this portfolio item?")) return;

    setSaving(true);
    try {
      const response = await fetch(`/api/admin/portfolio/${id}`, { method: "DELETE" });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(getFriendlyError(body, "Could not delete portfolio item."));
      }

      await loadItems();
      if (selectedId === id) {
        closeEditor();
      }
      showToast("Portfolio item deleted successfully.", "success");
    } catch (deleteError) {
      const message = deleteError instanceof Error ? deleteError.message : "Could not delete portfolio item.";
      showToast(message, "error");
    } finally {
      setSaving(false);
    }
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/dashboard/login";
  };

  return (
    <section className="relative mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
      {toast ? (
        <Toast
          message={toast.message}
          variant={toast.variant}
          onClose={() => setToast(null)}
          key={toast.id}
        />
      ) : null}

      <div className="mb-4 flex items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Admin / Portfolio</p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-900">Book records</h1>
          <p className="mt-1 text-sm text-slate-500">Manage database entries in a table-first workflow.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={loadItems}
            className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <RefreshCcw className="size-4" />
            Refresh
          </button>
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            <Plus className="size-4" />
            Add record
          </button>
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <LogOut className="size-4" />
            Logout
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Portfolio database</h2>
            <p className="text-xs text-slate-500">{items.length} rows</p>
          </div>
          {loading ? <span className="text-xs text-slate-500">Loading...</span> : null}
        </div>

        <div className="max-h-[72vh] overflow-auto">
          <table className="min-w-[1200px] w-full border-separate border-spacing-0 text-left text-sm">
            <thead className="sticky top-0 z-10 bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-500">
              <tr>
                <th className="border-b border-slate-200 px-4 py-3 font-medium">ID</th>
                <th className="border-b border-slate-200 px-4 py-3 font-medium">Title</th>
                <th className="border-b border-slate-200 px-4 py-3 font-medium">Author</th>
                <th className="border-b border-slate-200 px-4 py-3 font-medium">Category</th>
                <th className="border-b border-slate-200 px-4 py-3 font-medium">Genre</th>
                <th className="border-b border-slate-200 px-4 py-3 font-medium">Sort</th>
                <th className="border-b border-slate-200 px-4 py-3 font-medium">Cover</th>
                <th className="border-b border-slate-200 px-4 py-3 font-medium">Amazon</th>
                <th className="border-b border-slate-200 px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {!loading && items.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-16 text-center text-slate-500">
                    No books found. Click “Add record” to create the first entry.
                  </td>
                </tr>
              ) : null}

              {items.map((item) => (
                <tr key={item.id} className={cn("border-b border-slate-100 hover:bg-slate-50", selectedId === item.id && "bg-slate-50")}>
                  <td className="whitespace-nowrap px-4 py-4 font-mono text-xs text-slate-600">{item.id}</td>
                  <td className="px-4 py-4 font-medium text-slate-900">
                    <div className="max-w-[260px] truncate">{item.title}</div>
                  </td>
                  <td className="px-4 py-4 text-slate-700">{item.author}</td>
                  <td className="px-4 py-4 text-slate-700">{PORTFOLIO_CATEGORY_LABELS[item.category]}</td>
                  <td className="px-4 py-4 text-slate-700">{item.genre}</td>
                  <td className="px-4 py-4 text-slate-700">{item.sortOrder}</td>
                  <td className="px-4 py-4 text-slate-700">
                    <a href={item.coverImage} target="_blank" rel="noreferrer" className="text-sky-600 hover:underline">
                      View
                    </a>
                  </td>
                  <td className="px-4 py-4 text-slate-700">
                    <a href={item.amazonUrl} target="_blank" rel="noreferrer" className="max-w-[220px] truncate text-sky-600 hover:underline">
                      Open
                    </a>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(item.id)}
                        className="inline-flex items-center gap-1 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
                      >
                        <Edit3 className="size-3.5" />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => remove(item.id)}
                        className="inline-flex items-center gap-1 rounded-md border border-rose-200 bg-white px-3 py-1.5 text-xs font-medium text-rose-700 transition hover:bg-rose-50"
                      >
                        <Trash2 className="size-3.5" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isEditorOpen ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 px-4 py-6 backdrop-blur-sm">
          <div className="relative z-[101] w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Book editor</p>
                <h2 className="mt-1 text-xl font-semibold text-slate-900">
                  {isEditing ? "Edit record" : "Add record"}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeEditor}
                className="rounded-md p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                aria-label="Close modal"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="max-h-[calc(100vh-140px)] overflow-auto px-6 py-5">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-1.5 text-sm">
                  <span className="font-medium text-slate-700">ID</span>
                  <input
                    value={form.id}
                    onChange={(event) => updateField("id", event.target.value)}
                    disabled={isEditing}
                    className="rounded-md border border-slate-300 px-3 py-2.5 outline-none transition focus:border-slate-900 disabled:bg-slate-100"
                  />
                </label>

                <label className="grid gap-1.5 text-sm">
                  <span className="font-medium text-slate-700">Sort order</span>
                  <input
                    type="number"
                    min={0}
                    value={form.sortOrder}
                    onChange={(event) => updateField("sortOrder", Number(event.target.value))}
                    className="rounded-md border border-slate-300 px-3 py-2.5 outline-none transition focus:border-slate-900"
                  />
                </label>

                <label className="grid gap-1.5 text-sm md:col-span-2">
                  <span className="font-medium text-slate-700">Title</span>
                  <input
                    value={form.title}
                    onChange={(event) => updateField("title", event.target.value)}
                    className="rounded-md border border-slate-300 px-3 py-2.5 outline-none transition focus:border-slate-900"
                  />
                </label>

                <label className="grid gap-1.5 text-sm md:col-span-2">
                  <span className="font-medium text-slate-700">Author</span>
                  <input
                    value={form.author}
                    onChange={(event) => updateField("author", event.target.value)}
                    className="rounded-md border border-slate-300 px-3 py-2.5 outline-none transition focus:border-slate-900"
                  />
                </label>

                <label className="grid gap-1.5 text-sm">
                  <span className="font-medium text-slate-700">Category</span>
                  <select
                    value={form.category}
                    onChange={(event) => updateField("category", event.target.value as PortfolioCategory)}
                    className="rounded-md border border-slate-300 px-3 py-2.5 outline-none transition focus:border-slate-900"
                  >
                    <option value="published_book">Published books</option>
                    <option value="upcoming_book">Upcoming books</option>
                  </select>
                </label>

                <label className="grid gap-1.5 text-sm">
                  <span className="font-medium text-slate-700">Genre</span>
                  <select
                    value={form.genre}
                    onChange={(event) => updateField("genre", event.target.value as AdminPayload["genre"])}
                    className="rounded-md border border-slate-300 px-3 py-2.5 outline-none transition focus:border-slate-900"
                  >
                    {PORTFOLIO_GENRES.map((genre) => (
                      <option key={genre} value={genre}>
                        {genre}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-1.5 text-sm md:col-span-2">
                  <span className="font-medium text-slate-700">Amazon URL</span>
                  <input
                    value={form.amazonUrl}
                    onChange={(event) => updateField("amazonUrl", event.target.value)}
                    className="rounded-md border border-slate-300 px-3 py-2.5 outline-none transition focus:border-slate-900"
                  />
                </label>

                <label className="grid gap-1.5 text-sm md:col-span-2">
                  <span className="font-medium text-slate-700">Description</span>
                  <textarea
                    value={form.description ?? ""}
                    onChange={(event) => updateField("description", event.target.value)}
                    rows={4}
                    className="rounded-md border border-slate-300 px-3 py-2.5 outline-none transition focus:border-slate-900"
                  />
                </label>

                <div className="grid gap-1.5 text-sm md:col-span-2">
                  <span className="font-medium text-slate-700">Cover image</span>
                  <div className="flex items-center gap-3 rounded-md border border-dashed border-slate-300 bg-slate-50 px-3 py-3">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp,image/jpg"
                      onChange={handleCoverImageChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                    >
                      <Upload className="size-4" />
                      {coverImageFile ? "Change image" : "Upload image"}
                    </button>
                    <span className="text-sm text-slate-600">
                      {coverImageFile ? coverImageFile.name : isEditing ? "Keep existing image or replace it" : "Required for new records"}
                    </span>
                  </div>
                  {coverImagePreview ? (
                    <div className="overflow-hidden rounded-md border border-slate-200 bg-slate-50">
                      <img src={coverImagePreview} alt="Cover preview" className="h-48 w-full object-contain" />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-6 py-4">
              <button
                type="button"
                onClick={closeEditor}
                className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={submit}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save className="size-4" />
                {saving ? "Saving..." : isEditing ? "Update record" : "Create record"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
