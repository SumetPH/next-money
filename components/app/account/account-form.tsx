import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDownIcon, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMasterStore } from "@/store/master.store";
import { useState } from "react";
import dayjs from "dayjs";
import { Switch } from "@/components/ui/switch";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    title: z.string().min(1),
    type: z.string().min(1),
    credit_date: z.string().optional(),
    created_at: z.date(),
    is_hidden: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (data.type === "credit" && !data.credit_date) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "กรุณากรอกข้อมูล",
        path: ["credit_date"],
      });
    }
  });

type FormType = z.infer<typeof formSchema>;

type Props = {
  mode: "create" | "update";
  id?: number;
  defaultValues?: {
    title: string;
    type: string;
    credit_date: string | undefined;
    created_at: Date;
    is_hidden: boolean;
  };
};

export default function AccountForm({ mode, id, defaultValues }: Props) {
  const masterStore = useMasterStore();
  const router = useRouter();

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: defaultValues?.title ?? "",
      type: defaultValues?.type ?? "credit",
      credit_date: defaultValues?.credit_date ?? undefined,
      created_at: defaultValues?.created_at ?? dayjs().toDate(),
      is_hidden: defaultValues?.is_hidden ?? false,
    },
  });

  const type = form.watch("type");

  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values: FormType) {
    try {
      setIsLoading(true);

      const url = mode === "create" ? "/api/account" : `/api/account/${id}`;
      const method = mode === "create" ? "POST" : "PATCH";

      await fetch(`${process.env.NEXT_PUBLIC_API}${url}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: values.title,
          type: values.type,
          credit_date: Number(values.credit_date),
          is_hidden: values.is_hidden,
          created_at: values.created_at.toISOString(),
        }),
      });
      router.back();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{mode === "create" ? "สร้างบัญชี" : "แก้ไขบัญชี"}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="grid gap-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-1">ชื่อบัญชี</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="ระบุ" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-1">ประเภทบัญชี</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="เลือก" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {...masterStore.accountType.map((accountType) => (
                        <SelectItem
                          key={accountType.value}
                          value={accountType.value}
                        >
                          {accountType.text}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {type === "credit" && (
              <FormField
                control={form.control}
                name="credit_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-1">วันสรุปยอด</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="เลือก" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {...new Array(31).fill(0).map((_, index) => (
                          <SelectItem key={index} value={String(index + 1)}>
                            {index + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="created_at"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-1">วันที่สร้าง</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          id="date"
                          className="w-full justify-between font-normal"
                        >
                          {field.value
                            ? dayjs(field.value).format("DD/MM/YYYY")
                            : "Select date"}
                          <ChevronDownIcon />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="is_hidden"
              render={({ field }) => (
                <FormItem className="flex justify-between items-center gap-3">
                  <FormLabel>ซ่อนบัญชีนี้</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <section>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2Icon className="animate-spin" />}
                <span>บันทึก</span>
              </Button>
            </section>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
