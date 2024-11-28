'use client';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Copy, Link, Settings, Server, CheckCircle2, Globe, Ban } from "lucide-react";
import { toast } from 'sonner';
import { FormattedMessage, useIntl } from 'react-intl';
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useCopyToClipboard } from 'react-use';

// 修改通用的描述文字样式
const descriptionClass = "text-xs text-muted-foreground mt-1.5";

// 添加一个错误文字样式类
const errorClass = "text-xs text-destructive mt-1.5";  // 使用 shadcn 的 destructive 颜色

// 添加常量
const SUBSCRIPTION_URL_PLACEHOLDER = 'https://jmssub.net/members/getsub.php?service=xxx&id=xxx-xxx-xxx';

export default function Home() {
  const [result, setResult] = useState('');
  const [copyState, copyToClipboard] = useCopyToClipboard();
  const { formatMessage } = useIntl();
  
  // 将 schema 定义移到这里
  const formSchema = z.object({
    baseUrl: z.string()
      .url(formatMessage({ id: 'validation.url' })),
    excludeShadowsocks: z.boolean(),
    excludeVmess: z.boolean(),
    excludedServers: z.number().array(),
    useDomains: z.boolean(),
  });

  type FormValues = z.infer<typeof formSchema>;

  const { register, handleSubmit, formState: { errors }, control } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      baseUrl: '',
      excludeShadowsocks: false,
      excludeVmess: false,
      excludedServers: [],
      useDomains: true,
    }
  });

  const serverOptions = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
  ];

  // 监听 copyState 变化
  useEffect(() => {
    if (!copyState.value) return;  // 初始状态不处理
    
    if (copyState.error) {
      toast.error(formatMessage({ id: 'toast.copyFailed' }));
    } else {
      toast.success(formatMessage({ id: result === copyState.value ? 'toast.copied' : 'toast.generated' }));
    }
  }, [copyState, formatMessage, result]);

  const onSubmit = async (data: FormValues) => {
    const url = new URL(data.baseUrl);
    if (data.excludeShadowsocks) url.searchParams.append('noss', '1');
    if (data.excludeVmess) url.searchParams.append('novmess', '1');
    if (data.excludedServers.length > 0) {
      url.searchParams.append('exclude', data.excludedServers.sort((a, b) => a - b).join(','));
    }
    if (data.useDomains) url.searchParams.append('usedomains', '1');

    const finalLink = url.href;
    setResult(finalLink);
    copyToClipboard(finalLink);
  };

  const handleCopy = () => copyToClipboard(result);

  return (
    <main className="min-h-screen p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="max-w-screen-sm mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <Link className="h-5 w-5" />
              <FormattedMessage id="app.title" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className={descriptionClass}>
              <FormattedMessage id="app.description" />
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="baseUrl">
                  <FormattedMessage id="baseUrl.label" />
                </Label>
                <p className={descriptionClass}>
                  <FormattedMessage id="baseUrl.description" />
                </p>
                <Textarea
                  id="baseUrl"
                  placeholder={SUBSCRIPTION_URL_PLACEHOLDER}
                  {...register('baseUrl')}
                  rows={3}
                  className="w-full"
                />
                {errors.baseUrl && (
                  <p className={errorClass}>{errors.baseUrl.message}</p>
                )}
              </div>

              <div className="space-y-4">
                <Label className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <FormattedMessage id="options.title" />
                </Label>
                <div className="grid gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Ban className="h-4 w-4" />
                        <Label htmlFor="shadowsocks">
                          <FormattedMessage id="options.shadowsocks.label" />
                        </Label>
                      </div>
                      <Controller
                        name="excludeShadowsocks"
                        control={control}
                        render={({ field }) => (
                          <Switch
                            id="shadowsocks"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                    </div>
                    <p className={descriptionClass}>
                      <FormattedMessage id="options.shadowsocks.description" />
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Ban className="h-4 w-4" />
                        <Label htmlFor="vmess">
                          <FormattedMessage id="options.vmess.label" />
                        </Label>
                      </div>
                      <Controller
                        name="excludeVmess"
                        control={control}
                        render={({ field }) => (
                          <Switch
                            id="vmess"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                    </div>
                    <p className={descriptionClass}>
                      <FormattedMessage id="options.vmess.description" />
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        <Label htmlFor="domains">
                          <FormattedMessage id="options.domains.label" />
                        </Label>
                        <span className="text-xs text-green-500 dark:text-green-400">
                          <FormattedMessage id="options.domains.recommended" />
                        </span>
                      </div>
                      <Controller
                        name="useDomains"
                        control={control}
                        render={({ field }) => (
                          <Switch
                            id="domains"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                    </div>
                    <p className={descriptionClass}>
                      <FormattedMessage id="options.domains.description" />
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Server className="h-4 w-4" />
                  <FormattedMessage id="excludeNodes.title" />
                </Label>
                <p className={descriptionClass} dangerouslySetInnerHTML={{ 
                  __html: formatMessage({ id: 'excludeNodes.description' }) 
                }} />
                <Controller
                  name="excludedServers"
                  control={control}
                  render={({ field }) => (
                    <ToggleGroup
                      type="multiple"
                      value={field.value.map(String)}
                      onValueChange={(values) => {
                        field.onChange(values.map(Number));
                      }}
                      className="inline-flex gap-2"
                    >
                      {serverOptions.map((server) => (
                        <ToggleGroupItem
                          key={server.id}
                          value={String(server.id)}
                          variant="outline"
                          size="sm"
                          className="data-[state=on]:bg-destructive data-[state=on]:text-destructive-foreground data-[state=on]:hover:bg-destructive/90"
                        >
                          {server.id}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  )}
                />
              </div>

              <Button type="submit" className="w-full flex items-center justify-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                <FormattedMessage id="actions.generate" />
              </Button>
            </form>

            {result && (
              <div className="space-y-2">
                <Label>
                  <FormattedMessage id="result.title" />
                </Label>
                <p className={descriptionClass}>
                  <FormattedMessage id="result.description" />
                </p>
                <div className="relative">
                  <Textarea
                    value={result}
                    readOnly
                    rows={3}
                    className="pr-12"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-2 top-2 h-8 w-8"
                    onClick={handleCopy}
                  >
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">
                      <FormattedMessage id="actions.copy" />
                    </span>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
