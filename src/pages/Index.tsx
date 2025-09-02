import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  // Mock data
  const dashboardStats = [
    { title: 'Активные кампании', value: 12, icon: 'Mail', trend: '+15%', color: 'text-blue-600' },
    { title: 'Отправлено писем', value: 2847, icon: 'Send', trend: '+22%', color: 'text-green-600' },
    { title: 'Открытия', value: '24.5%', icon: 'Eye', trend: '+3.2%', color: 'text-purple-600' },
    { title: 'Ответы', value: '8.1%', icon: 'MessageSquare', trend: '+1.8%', color: 'text-orange-600' },
  ];

  const campaigns = [
    { id: 1, name: 'SaaS Outreach Q4', status: 'active', sent: 245, opened: 62, replied: 18, sequences: 5 },
    { id: 2, name: 'Enterprise Leads', status: 'paused', sent: 189, opened: 45, replied: 12, sequences: 3 },
    { id: 3, name: 'Startup Founders', status: 'active', sent: 156, opened: 41, replied: 8, sequences: 4 },
  ];

  const contacts = [
    { id: 1, name: 'Алексей Иванов', email: 'a.ivanov@company.ru', company: 'TechCorp', status: 'replied', lastActivity: '2 часа назад' },
    { id: 2, name: 'Мария Петрова', email: 'm.petrova@startup.com', company: 'StartupLab', status: 'opened', lastActivity: '1 день назад' },
    { id: 3, name: 'Дмитрий Смирнов', email: 'd.smirnov@enterprise.ru', company: 'BigCorp', status: 'sent', lastActivity: '3 дня назад' },
    { id: 4, name: 'Елена Козлова', email: 'e.kozlova@saas.io', company: 'CloudSoft', status: 'bounced', lastActivity: '1 неделю назад' },
  ];

  const sequences = [
    { id: 1, name: 'Знакомство с продуктом', emails: 4, delay: '2 дня', activeContacts: 127 },
    { id: 2, name: 'Follow-up серия', emails: 3, delay: '5 дней', activeContacts: 89 },
    { id: 3, name: 'Реактивация', emails: 5, delay: '1 неделя', activeContacts: 45 },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: 'Активна', variant: 'default' as const, color: 'bg-green-100 text-green-800' },
      paused: { label: 'Пауза', variant: 'secondary' as const, color: 'bg-yellow-100 text-yellow-800' },
      completed: { label: 'Завершена', variant: 'outline' as const, color: 'bg-gray-100 text-gray-800' },
      sent: { label: 'Отправлено', variant: 'outline' as const, color: 'bg-blue-100 text-blue-800' },
      opened: { label: 'Открыто', variant: 'default' as const, color: 'bg-purple-100 text-purple-800' },
      replied: { label: 'Ответил', variant: 'default' as const, color: 'bg-green-100 text-green-800' },
      bounced: { label: 'Ошибка', variant: 'destructive' as const, color: 'bg-red-100 text-red-800' },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Icon name="Mail" size={18} className="text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Email Outreach Platform</h1>
            </div>
          </div>
          <Button>
            <Icon name="Plus" size={16} className="mr-2" />
            Новая кампания
          </Button>
        </div>
      </header>

      <div className="p-6">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <p className={`text-sm ${stat.color} mt-1`}>{stat.trend}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gray-50`}>
                    <Icon name={stat.icon as any} size={24} className={stat.color} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Дашборд</TabsTrigger>
            <TabsTrigger value="contacts">База контактов</TabsTrigger>
            <TabsTrigger value="campaigns">Кампании</TabsTrigger>
            <TabsTrigger value="sequences">Sequences</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Campaign Performance */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon name="TrendingUp" size={20} />
                    <span>Активные кампании</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {campaigns.map((campaign) => (
                      <div key={campaign.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                            <span>Отправлено: {campaign.sent}</span>
                            <span>Открыто: {campaign.opened}</span>
                            <span>Ответили: {campaign.replied}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          {getStatusBadge(campaign.status)}
                          <div className="mt-2">
                            <Progress value={(campaign.opened / campaign.sent) * 100} className="w-24" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon name="Zap" size={20} />
                    <span>Быстрые действия</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Icon name="UserPlus" size={16} className="mr-2" />
                    Импорт контактов
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Icon name="FileText" size={16} className="mr-2" />
                    Создать шаблон
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Icon name="BarChart3" size={16} className="mr-2" />
                    Аналитика
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Icon name="Settings" size={16} className="mr-2" />
                    Настройки
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">База контактов</h2>
                <p className="text-gray-600">Управляйте своими контактами и сегментами</p>
              </div>
              <div className="flex space-x-3">
                <Input placeholder="Поиск контактов..." className="w-64" />
                <Button>
                  <Icon name="Upload" size={16} className="mr-2" />
                  Импорт
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Контакт</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Компания</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Последняя активность</TableHead>
                      <TableHead className="w-[100px]">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contacts.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell className="font-medium">{contact.name}</TableCell>
                        <TableCell>{contact.email}</TableCell>
                        <TableCell>{contact.company}</TableCell>
                        <TableCell>{getStatusBadge(contact.status)}</TableCell>
                        <TableCell className="text-gray-500">{contact.lastActivity}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="ghost">
                            <Icon name="MoreHorizontal" size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Кампании</h2>
                <p className="text-gray-600">Создавайте и управляйте email кампаниями</p>
              </div>
              <Button>
                <Icon name="Plus" size={16} className="mr-2" />
                Создать кампанию
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaigns.map((campaign) => (
                <Card key={campaign.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">{campaign.name}</h3>
                      {getStatusBadge(campaign.status)}
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Отправлено</span>
                        <span className="font-medium">{campaign.sent}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Открытий</span>
                        <span className="font-medium">{campaign.opened} ({Math.round((campaign.opened/campaign.sent)*100)}%)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Ответов</span>
                        <span className="font-medium">{campaign.replied} ({Math.round((campaign.replied/campaign.sent)*100)}%)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Sequences</span>
                        <span className="font-medium">{campaign.sequences}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Icon name="Edit" size={14} className="mr-1" />
                          Редактировать
                        </Button>
                        <Button size="sm" variant="outline">
                          <Icon name="BarChart3" size={14} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Sequences Tab */}
          <TabsContent value="sequences" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Email Sequences</h2>
                <p className="text-gray-600">Автоматические последовательности писем</p>
              </div>
              <Button>
                <Icon name="Plus" size={16} className="mr-2" />
                Создать sequence
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sequences.map((sequence) => (
                <Card key={sequence.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">{sequence.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Icon name="Mail" size={14} className="mr-1" />
                            {sequence.emails} писем
                          </span>
                          <span className="flex items-center">
                            <Icon name="Clock" size={14} className="mr-1" />
                            {sequence.delay}
                          </span>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">
                        <Icon name="MoreVertical" size={16} />
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Активных контактов</span>
                        <span className="font-medium">{sequence.activeContacts}</span>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Прогресс</span>
                          <span>{Math.round((sequence.activeContacts / 200) * 100)}%</span>
                        </div>
                        <Progress value={(sequence.activeContacts / 200) * 100} className="h-2" />
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Icon name="Edit" size={14} className="mr-1" />
                          Настроить
                        </Button>
                        <Button size="sm" variant="outline">
                          <Icon name="Play" size={14} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Sequence Builder Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="Workflow" size={20} />
                  <span>Построитель Sequences</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon name="Mail" size={18} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Email 1: Знакомство</p>
                      <p className="text-xs text-gray-500">Сразу после добавления</p>
                    </div>
                  </div>
                  <Icon name="ArrowRight" size={16} className="text-gray-400" />
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Icon name="Clock" size={18} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Пауза: 3 дня</p>
                      <p className="text-xs text-gray-500">Ожидание ответа</p>
                    </div>
                  </div>
                  <Icon name="ArrowRight" size={16} className="text-gray-400" />
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Icon name="Mail" size={18} className="text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Email 2: Follow-up</p>
                      <p className="text-xs text-gray-500">Если нет ответа</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="ml-auto">
                    <Icon name="Plus" size={14} className="mr-1" />
                    Добавить шаг
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;