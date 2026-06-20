"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import RichTextEditor from "@/components/admin/RichTextEditor";

const schema = z.object({
  locale: z.enum(["HR", "EN"]),
  title: z.string().min(1, "Obavezno"),
  slug: z.string().min(1, "Obavezno"),
  excerpt: z.string().optional(),
  authorName: z.string().default("Matija Pinko"),
  status: z.enum(["DRAFT", "PUBLISHED"]),
  featured: z.boolean().default(false),
  categoryId: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  coverImage: z.string().optional(),
  coverImageAlt: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface BlogPostFormProps {
  post?: {
    id: string;
    locale: string;
    title: string;
    slug: string;
    excerpt?: string | null;
    authorName?: string | null;
    status: string;
    featured: boolean;
    categoryId?: string | null;
    seoTitle?: string | null;
    seoDescription?: string | null;
    coverImage?: string | null;
    coverImageAlt?: string | null;
    content?: unknown;
  };
  categories: Array<{ id: string; name: string; locale: string }>;
}

export default function BlogPostForm({ post, categories }: BlogPostFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [content, setContent] = useState<unknown>(post?.content || null);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema) as Resolver<FormData>,
    defaultValues: {
      locale: (post?.locale as "HR" | "EN") || "HR",
      title: post?.title || "",
      slug: post?.slug || "",
      excerpt: post?.excerpt || "",
      authorName: post?.authorName || "Matija Pinko",
      status: (post?.status as "DRAFT" | "PUBLISHED") || "DRAFT",
      featured: post?.featured || false,
      categoryId: post?.categoryId || "",
      seoTitle: post?.seoTitle || "",
      seoDescription: post?.seoDescription || "",
      coverImage: post?.coverImage || "",
      coverImageAlt: post?.coverImageAlt || "",
    },
  });

  const locale = watch("locale");
  const filteredCategories = categories.filter((c) => c.locale === locale);

  const onSubmit = async (data: FormData) => {
    setSaving(true);
    setError("");
    try {
      const url = post ? `/api/admin/blog/${post.id}` : "/api/admin/blog";
      const method = post ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, content }),
      });
      if (!res.ok) throw new Error("Failed");
      const saved = await res.json();
      router.push(`/admin/blog/${saved.id}`);
      router.refresh();
    } catch {
      setError("Greška pri spremanju");
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-[#D4AF37]";
  const labelClass = "block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1.5";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Basic */}
      <div className="bg-white border border-gray-200 p-6">
        <h3 className="font-semibold text-lg mb-5">Osnovne informacije</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Jezik *</label>
            <select {...register("locale")} className={inputClass + " bg-white"}>
              <option value="HR">🇭🇷 Hrvatski</option>
              <option value="EN">🇬🇧 English</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Status *</label>
            <select {...register("status")} className={inputClass + " bg-white"}>
              <option value="DRAFT">Skica</option>
              <option value="PUBLISHED">Objavljeno</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Naslov *</label>
            <input {...register("title")} className={inputClass} />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Slug *</label>
            <input {...register("slug")} className={inputClass} />
            {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Kategorija</label>
            <select {...register("categoryId")} className={inputClass + " bg-white"}>
              <option value="">— Bez kategorije —</option>
              {filteredCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Autor</label>
            <input {...register("authorName")} className={inputClass} />
          </div>
        </div>
        <div className="mt-4">
          <label className={labelClass}>Sažetak (excerpt)</label>
          <textarea {...register("excerpt")} rows={3} className={inputClass + " resize-none"} />
        </div>
        <div className="mt-4 flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" {...register("featured")} className="w-4 h-4 accent-[#D4AF37]" />
            <span className="text-sm font-medium">Istaknuto</span>
          </label>
        </div>
      </div>

      {/* Cover image */}
      <div className="bg-white border border-gray-200 p-6">
        <h3 className="font-semibold text-lg mb-4">Naslovna slika</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>URL slike</label>
            <input {...register("coverImage")} className={inputClass} placeholder="https://..." />
          </div>
          <div>
            <label className={labelClass}>Alt tekst</label>
            <input {...register("coverImageAlt")} className={inputClass} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white border border-gray-200 p-6">
        <h3 className="font-semibold text-lg mb-4">Sadržaj</h3>
        <RichTextEditor content={content} onChange={setContent} />
      </div>

      {/* SEO */}
      <div className="bg-white border border-gray-200 p-6">
        <h3 className="font-semibold text-lg mb-4">SEO</h3>
        <div className="space-y-4">
          <div>
            <label className={labelClass}>SEO naslov</label>
            <input {...register("seoTitle")} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>SEO opis</label>
            <textarea {...register("seoDescription")} rows={2} className={inputClass + " resize-none"} />
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex gap-4">
        <button type="submit" disabled={saving} className="px-8 py-3 bg-[#D4AF37] text-white font-semibold hover:bg-[#B8972E] transition-colors disabled:opacity-50">
          {saving ? "Spremam..." : "Spremi post"}
        </button>
        <button type="button" onClick={() => router.back()} className="px-8 py-3 border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors">
          Odustani
        </button>
      </div>
    </form>
  );
}
